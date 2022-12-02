import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Customer } from 'src/app/core/models/customers.model';
import { RequestStatus } from 'src/app/core/models/request-status.enum';
import { CustomersService } from 'src/app/core/services/customers.service';
import { AlertMessageComponent, AlertMessage, MessageTypes } from 'src/app/shared/components/alert-message/alert-message.component';
import { Column } from 'src/app/shared/components/datatable/column.model';
import { PageSpec, SortSpec } from 'src/app/shared/components/datatable/datatable.component';
import { ControlTypes } from 'src/app/shared/components/form-builder/control-type.enum';
import { FormBuilderGroup } from 'src/app/shared/components/form-builder/form-builder-group.model';
import { FormBuilderComponent, FormBuilderPropsSpec } from 'src/app/shared/components/form-builder/form-builder.component';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


    columns: Column[] = [];
    data: Customer[] = [];
    pageIndex = 1;
    pageSize = 10;
    totalRecords = 0;
    totalPages = 1;
    orderBy = "lastUpdate";
    ascending = false;
    searchValue = "";
    getRequest = RequestStatus.Initial;
    dimRequest = RequestStatus.Initial;
    constructor(
        private _service: CustomersService,
        private _dialog: MatDialog,
        @Inject("BASE_API_URL") public baseUrl: string,
    ) { }

    ngOnInit(): void {
        this.initColumns();
        this.getData();
    }
    /********************************* Initialize Data and Column ******************************************** */
    async getData() {
        try {
            this.getRequest = RequestStatus.Loading;
            var result = await firstValueFrom(this._service.get(this.pageIndex, this.pageSize, this.searchValue));
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
                title: "Id",
                prop: "customerId",
                sortable: true,
                show: true
            },
            {
                title: "Customer Name",
                prop: "customerName",
                sortable: false,
                show: true
            },
            {
                title: "Customer Phone",
                prop: "phoneNumber",
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
                title: "Manage Invoices",
                prop: "invoices",
                sortable: false,
                show: true
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
    onUpdate(item: Customer) {
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

    getForm(item?: Customer): FormBuilderGroup[] {
        var controlGroups: FormBuilderGroup[] = [
            {

                title: "General",
                controls: [
                    {
                        name: 'customerName',
                        title: 'Customer Name',
                        controlType: ControlTypes.TextInput,
                        value: item ? item.customerName : undefined,
                        width: '100%'
                    },
                    {
                        name: 'phoneNumber',
                        title: 'Customer Phone',
                        controlType: ControlTypes.NumberInput,
                        value: item ? item.phoneNumber : undefined,
                        width: '100%'
                    },

                ]
            }
        ];
        return controlGroups;
    }

    async openForm(item?: Customer) {
        var form = this.getForm(item);
        this._dialog.open<FormBuilderComponent, FormBuilderPropsSpec, any>(FormBuilderComponent, {
            data: {
                title: item ? 'Update Customer' : "Create Customer",
                controlsGroups: form,
                onSubmit: (result) => {
                    this._dialog.closeAll();
                    var formResult = result as Customer;
                    if (item) {
                        formResult['customerId'] = item.customerId;
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

    create = async (item: Customer) => {
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
    update = async (item: Customer) => {
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
