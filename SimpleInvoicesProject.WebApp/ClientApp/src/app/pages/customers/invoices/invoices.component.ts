import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InvoiceStates } from 'src/app/core/models/invoice-state.enum';
import { Invoice } from 'src/app/core/models/invoice.model';
import { RequestStatus } from 'src/app/core/models/request-status.enum';
import { InvoicesService } from 'src/app/core/services/invoices.service';
import { AlertMessageComponent, AlertMessage, MessageTypes } from 'src/app/shared/components/alert-message/alert-message.component';
import { Column } from 'src/app/shared/components/datatable/column.model';
import { PageSpec, SortSpec } from 'src/app/shared/components/datatable/datatable.component';
import { ControlTypes } from 'src/app/shared/components/form-builder/control-type.enum';
import { FormBuilderGroup } from 'src/app/shared/components/form-builder/form-builder-group.model';
import { FormBuilderComponent, FormBuilderPropsSpec } from 'src/app/shared/components/form-builder/form-builder.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  columns: Column[] = [];
  data: Invoice[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 1;
  orderBy = "lastUpdate";
  ascending = false;
  searchValue = "";
  getRequest = RequestStatus.Initial;
  dimRequest = RequestStatus.Initial;
  states = InvoiceStates;
  customerId:number = 0;
  constructor(
    private _service: InvoicesService,
    private _dialog: MatDialog,
    private _route:ActivatedRoute,
    @Inject("BASE_API_URL") public baseUrl: string,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(res => this.customerId = res['id']);
    this.initColumns();
    this.getData();
  }
  /********************************* Initialize Data and Column ******************************************** */
  async getData() {
    try {
      this.getRequest = RequestStatus.Loading;
      var result = await firstValueFrom(this._service.getCustomerInvoices(this.customerId,this.pageIndex, this.pageSize, this.searchValue));
      this.data = result.data;
      this.totalPages = result.totalPages;
      this.totalRecords = result.totalRecords;
      this.getRequest = RequestStatus.Success;
    } catch (error) {
      console.log(error);
      this.getRequest = RequestStatus.Failed;

    }
  }
  initColumns() {
    this.columns = [
      {
        title: "Invoice Id",
        prop: "invoiceId",
        sortable: true,
        show: true
      },
      {
        title: "Customer Name",
        prop: "customer",
        sortable: false,
        show: true
      },
      {
        title: "Invoice Date",
        prop: "date",
        sortable: false,
        show: true
      },
      {
        title: "State",
        prop: "state",
        sortable: false,
        show: true
      },
      {
        prop: "createdAt",
        title: "Created At",
        show: true,
        sortable: true
      },
      {
        prop: "lastUpdate",
        title: "Last Update",
        show: true,
        sortable: true
      },

      {
        prop: "Actions",
        title: "Actions",
        show: true,
        sortable: false
      }
    ]
  }
  /********************************* Event Binding ******************************************** */

  onPageChange(event: PageSpec) {
    this.pageIndex = event.pageIndex!;
    this.pageSize = event.pageSize!;
    this.getData();
  }
  onSortChange(event: SortSpec) {
    this.orderBy = event.prop!;
    this.ascending = event.ascending;
    this.getData();
  }
  onSearch(value: string) {
    this.searchValue = value;
    this.getData();
  }
  onCreate() {
    this.openForm();
  }
  onUpdate(item: Invoice) {
    this.openForm(item);
  }
  onDeleteClick(id: number) {
    this._dialog.open<AlertMessageComponent, AlertMessage>(AlertMessageComponent, {
      data: {
        type: MessageTypes.CONFIRM,
        message: "Are you sure you want to delete this item ?",
        title: "confirm"
      }
    }).afterClosed().subscribe({
      next: (res) => {
        if (res == true)
          this.delete(id);
      }
    })
  }

  /********************************* Form Configuration ******************************************** */

  getForm(item?: Invoice): FormBuilderGroup[] {
    var controlGroups: FormBuilderGroup[] = [
      {

        title: "General",
        controls: [
          {
            name: 'date',
            title: 'Invoice Date',
            controlType: ControlTypes.DatePicker,
            value: item ? item.date : undefined,
            width: '50%'
          },
          {
            name: 'value',
            title: 'Invoice Value',
            controlType: ControlTypes.NumberInput,
            value: item ? item.value : undefined,
            width: '50%'
          },
          {
            name: 'state',
            title: 'Invoice State',
            controlType: ControlTypes.Selection,
            data:this.states,
            valueProp:'index',
            value: item ? item.state : undefined,
            width: '100%'
          },

        ]
      }
    ];
    return controlGroups;
  }

  async openForm(item?: Invoice) {
    var form = this.getForm(item);
    this._dialog.open<FormBuilderComponent, FormBuilderPropsSpec, any>(FormBuilderComponent, {
      data: {
        title: item ? 'Update Invoice' : "Create Invoice",
        controlsGroups: form,
        onSubmit: (result) => {
          result['customerId']= this.customerId;
          this._dialog.closeAll();
          var formResult = result as Invoice;
          if (item) {
            formResult['invoiceId'] = item.invoiceId;
            formResult['createdAt'] = item.createdAt;
            this.update(formResult);
          }
          else
            this.create(formResult);
        },
        onCancel: () => {
          this._dialog.closeAll();

        }
      },
      hasBackdrop: false,
      panelClass: "form-builder-dialog",
    })
  }

  /********************************* Api Integration ******************************************** */

  create = async (item: Invoice) => {
    try {
      this.dimRequest = RequestStatus.Loading;
      await firstValueFrom(this._service.post(item));
      this.dimRequest = RequestStatus.Success;
      this._dialog.open<AlertMessageComponent, AlertMessage>(AlertMessageComponent, {
        data: {
          type: MessageTypes.SUCCESS,
          message: "Item Created Successfully",
          title: "Success"
        }
      }).afterClosed().subscribe(_ => this._dialog.closeAll())
      this.getData();
    } catch (error) {
      this.dimRequest = RequestStatus.Failed;
      console.log(error);
    }
  }
  update = async (item: Invoice) => {
    try {
      this.dimRequest = RequestStatus.Loading;
      await firstValueFrom(this._service.put(item));
      this.dimRequest = RequestStatus.Success;
      this._dialog.open<AlertMessageComponent, AlertMessage>(AlertMessageComponent, {
        data: {
          type: MessageTypes.SUCCESS,
          message: "Item Date Updated Successfully",
          title: "Success"
        }
      }).afterClosed().subscribe(_ => this._dialog.closeAll())
      this.getData();
    } catch (error) {
      this.dimRequest = RequestStatus.Failed;
      console.log(error);
    }
  }
  delete = async (id: number) => {
    try {
      this.dimRequest = RequestStatus.Loading;
      await firstValueFrom(this._service.delete(id));
      this.dimRequest = RequestStatus.Success;
      this._dialog.open<AlertMessageComponent, AlertMessage>(AlertMessageComponent, {
        data: {
          type: MessageTypes.SUCCESS,
          message: "Item Deleted Successfully",
          title: "Success"
        }
      }).afterClosed().subscribe(_ => this._dialog.closeAll())
      this.getData();
    } catch (error) {
      console.log(error);
      this.dimRequest = RequestStatus.Failed;

    }
  }

}
