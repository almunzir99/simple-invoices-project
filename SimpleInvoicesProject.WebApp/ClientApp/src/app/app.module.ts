import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(c => c.CustomersModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('./pages/invoices/invoices.module').then(c => c.InvoicesModule)
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: "BASE_API_URL", useValue: environment.baseUrl },
    { provide: "DIRECTION", useValue: environment.direction },
    { provide: MAT_DIALOG_DATA, useValue: undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
