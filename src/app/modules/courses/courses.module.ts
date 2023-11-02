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
import { CourseBooksComponent } from './course-books/course-books.component';
import { CourseUsefulLinksComponent } from './course-useful-links/course-useful-links.component';
import { CourseFaqsComponent } from './course-faqs/course-faqs.component';
import { CourseTocComponent } from './course-toc/course-toc.component';
import { CourseAboutComponent } from './course-about/course-about.component';
import { CourseUpdateComponent } from './course-update/course-update.component';

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
        path: 'update/:id',
        component: CourseUpdateComponent,
      },

      {
        path: ':id',
        children: [
          {
            path: '',
            component: DetailComponent,
          },
          {
            path: 'lectures/:taskId',
            component: LectureComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    CourseCreateComponent,
    DetailComponent,
    LectureComponent,
    CourseBooksComponent,
    CourseUsefulLinksComponent,
    CourseFaqsComponent,
    CourseTocComponent,
    CourseAboutComponent,
    CourseUpdateComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    NgxEditorModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CoursesModule {}
