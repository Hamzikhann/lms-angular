import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxEditorModule } from 'ngx-editor';

import { AssignmentsComponent } from './detail/assignments/assignments.component';
import { GdbComponent } from './detail/gdb/gdb.component';
import { QuizesComponent } from './detail/quizes/quizes.component';
import { AnnouncementsComponent } from './detail/announcements/announcements.component';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { LectureComponent } from './detail/lecture/lecture.component';
import { CourseCreateComponent } from './course-create/course-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: 'create',
        component: CourseCreateComponent,
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: DetailComponent,
          },
          {
            path: 'announcements',
            loadChildren: () =>
              import('./detail/announcements/announcements.module').then(
                (m) => m.AnnouncementsModule
              ),
          },
          {
            path: 'assignments',
            loadChildren: () =>
              import('./detail/assignments/assignments.module').then(
                (m) => m.AssignmentsModule
              ),
          },
          {
            path: 'gdb',
            loadChildren: () =>
              import('./detail/gdb/gdb.module').then((m) => m.GdbModule),
          },
          {
            path: 'quizes',
            loadChildren: () =>
              import('./detail/quizes/quizes.module').then(
                (m) => m.QuizesModule
              ),
          },
          {
            path: 'lectures/:id',
            component: LectureComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AssignmentsComponent,
    GdbComponent,
    QuizesComponent,
    AnnouncementsComponent,
    DetailComponent,
    LectureComponent,
    CourseCreateComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    NgxEditorModule,
    RouterModule.forChild(routes),
  ],
})
export class CoursesModule {}
