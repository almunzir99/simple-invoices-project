import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import {ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatatableComponent } from './components/datatable/datatable.component';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatMenuModule} from '@angular/material/menu';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OfflineComponent } from './components/placeholders/offline/offline.component';
import { EmptyComponent } from './components/placeholders/empty/empty.component';
import { SpinnerComponent } from './components/placeholders/spinner/spinner.component';
import { DimmerLoadingComponent } from './components/dimmer-loading/dimmer-loading.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    FormBuilderComponent,
    DatatableComponent,
    DimmerLoadingComponent,
    EmptyComponent,
    OfflineComponent,
    SpinnerComponent,
    AlertMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    FormBuilderComponent,
    DatatableComponent,
    DimmerLoadingComponent,
    EmptyComponent,
    OfflineComponent,
    SpinnerComponent,
    AlertMessageComponent

  ]
})
export class SharedModule { }
