import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';

import { AuthGuard } from '../guards/auth.guard';
import { IndexComponent } from './index.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsComponent } from './agreements/terms/terms.component';
import { PoliciesComponent } from './agreements/policies/policies.component';
import { CoursesComponent } from './courses/courses.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { LearningPathsComponent } from './learning-paths/learning-paths.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { TeamsComponent } from './teams/teams.component';
import { DataTablesModule } from 'angular-datatables';
import { DashboardUserComponent } from './dashboard/dashboard-user/dashboard-user.component';
import { DashboardClientComponent } from './dashboard/dashboard-client/dashboard-client.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
    path: 'user',
    component: DashboardUserComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'learningPaths',
        component: LearningPathsComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'enrollments',
        component: EnrollmentsComponent,
      },
      {
        path: 'assignments',
        component: AssignmentsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },

      {
        path: 'account',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./help/help.module').then((m) => m.HelpModule),
      },
      {
        path: 'terms-and-conditions',
        component: TermsComponent,
      },
      {
        path: 'privacy-policies',
        component: PoliciesComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    TermsComponent,
    PoliciesComponent,
    CoursesComponent,
    NotificationsComponent,
    ClientsComponent,
    UsersComponent,
    LearningPathsComponent,
    AssignmentsComponent,
    EnrollmentsComponent,
    TeamsComponent,
    DashboardUserComponent,
    DashboardClientComponent,
    DashboardAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMasonryModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    NgApexchartsModule,
  ],
})
export class IndexModule {}
