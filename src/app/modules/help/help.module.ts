import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';

const routes: Routes = [
  {
    path: '',
    component: FaqsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'report-issue',
    component: ReportIssueComponent,
  },
];

@NgModule({
  declarations: [FaqsComponent, ContactUsComponent, ReportIssueComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class HelpModule {}
