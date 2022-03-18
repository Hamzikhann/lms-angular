import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { AuthGuard } from '../guards/auth.guard';
import { IndexComponent } from './index.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StickyNotesComponent } from './sticky-notes/sticky-notes.component';

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
        path: "sticky-notes",
        component: StickyNotesComponent
      }, 
      {
        path: "community",
        loadChildren: () => import("./community/community.module").then(m => m.CommunityModule)
      },
      {
        path: "account",
        loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
      },
      {
        path: "help",
        loadChildren: () => import("./help/help.module").then(m => m.HelpModule)
      },
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    StickyNotesComponent
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
