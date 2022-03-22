import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: "",
    component: PaymentsComponent
  }, 
  {
    path: ":id",
    component: InvoiceComponent
  }
];

@NgModule({
  declarations: [
    PaymentsComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountBookModule { }
