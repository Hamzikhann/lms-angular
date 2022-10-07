import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsComponent } from './assignments/assignments.component';
import { GdbComponent } from './gdb/gdb.component';
import { QuizesComponent } from './quizes/quizes.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CoursesComponent,
      },
      {
        path: ":id",
        children: [
          {
            path: "",
            component: AboutComponent
          }, 
          {
            path: "announcements",
            loadChildren: () => import("./announcements/announcements.module").then(m => m.AnnouncementsModule)
          }, 
          {
            path: "assignments",
            loadChildren: () => import("./assignments/assignments.module").then(m => m.AssignmentsModule)
          }, 
          {
            path: "gdb",
            loadChildren: () => import("./gdb/gdb.module").then(m => m.GdbModule)
          }, 
          {
            path: "quizes",
            loadChildren: () => import("./quizes/quizes.module").then(m => m.QuizesModule)
          }, 
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AssignmentsComponent,
    GdbComponent,
    QuizesComponent,
    AnnouncementsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
