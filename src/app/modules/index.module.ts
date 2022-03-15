import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { AuthGuard } from '../guards/auth.guard';
import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    // canActivate: [AuthGuard],
    component: IndexComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      }, 
      {
        path: "users",
        loadChildren: () => import("./users/users.module").then(m => m.UsersModule)
      },
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent
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
export class IndexModule { }
