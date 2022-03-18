import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { ProfileSecurityComponent } from './profile-security/profile-security.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileSecurityComponent
  }, 
  {
    path: "email-notifications",
    component: EmailNotificationsComponent
  }, 
  {
    path: "payments-history",
    component: PaymentsHistoryComponent
  }
];

@NgModule({
  declarations: [
    ProfileSecurityComponent,
    EmailNotificationsComponent,
    PaymentsHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    NgSelectizeModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
