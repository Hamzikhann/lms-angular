import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePrivacyComponent,
  },
  {
    path: 'email-notifications',
    component: EmailNotificationsComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  declarations: [
    EmailNotificationsComponent,
    ChangePasswordComponent,
    ProfilePrivacyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule {}
