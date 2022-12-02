import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path:'',
    component:CustomersComponent
  },
  {
    path:":id/invoices",
    loadChildren:() => import('./invoices/invoices.module').then(c => c.InvoicesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
