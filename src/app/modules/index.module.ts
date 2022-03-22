import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';
import { NgxMasonryModule } from 'ngx-masonry';

import { AuthGuard } from '../guards/auth.guard';
import { IndexComponent } from './index.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StickyNotesComponent } from './sticky-notes/sticky-notes.component';
import { TermsComponent } from './agreements/terms/terms.component';
import { PoliciesComponent } from './agreements/policies/policies.component';
import { AnnounementsComponent } from './announements/announements.component';
import { MessagesComponent } from './messages/messages.component';

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
        path: "messages",
        component: MessagesComponent
      }, 
      {
        path: "announcements",
        component: AnnounementsComponent
      }, 
      {
        path: "account-book",
        loadChildren: () => import("./account-book/account-book.module").then(m => m.AccountBookModule)
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
        loadChildren: () => import("./settings/settings.module").then(m => m.SettingsModule)
      },
      {
        path: "help",
        loadChildren: () => import("./help/help.module").then(m => m.HelpModule)
      },
      {
        path: "terms-and-conditions",
        component: TermsComponent
      }, 
      {
        path: "privacy-policies",
        component: PoliciesComponent
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
    StickyNotesComponent,
    TermsComponent,
    PoliciesComponent,
    AnnounementsComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    NgSelectizeModule,
    NgxMasonryModule,
    RouterModule.forChild(routes)
  ]
})
export class IndexModule { }
