import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CoursesComponent } from './courses.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { DetailComponent } from './detail/detail.component';
import { LectureComponent } from './detail/lecture/lecture.component';

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
            path: 'lectures/:id',
            component: LectureComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [CourseCreateComponent, DetailComponent, LectureComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    NgxEditorModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CoursesModule {}
