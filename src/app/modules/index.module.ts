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
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { LearningPathsComponent } from './learning-paths/learning-paths.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';

const routes: Routes = [
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
        path: 'home',
        component: HomeComponent,
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
        path: 'enrollments',
        component: EnrollmentsComponent,
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
    HomeComponent,
    ClientsComponent,
    UsersComponent,
    LearningPathsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMasonryModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes),
  ],
})
export class IndexModule {}
