import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YouTubePlayerModule } from '@angular/youtube-player';

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
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CourseAchievementsComponent } from './course-achievements/course-achievements.component';
import { CourseAssignmnetReportComponent } from './course-assignmnet-report/course-assignmnet-report.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: 'courseAssignmentReport/:id',
        component: CourseAssignmnetReportComponent,
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
        component: DetailComponent,
        children: [
          {
            path: '',
            component: CourseAboutComponent,
          },
          {
            path: 'tasks',
            component: CourseTocComponent,
          },
          {
            path: 'books',
            component: CourseBooksComponent,
          },
          {
            path: 'useful-links',
            component: CourseUsefulLinksComponent,
          },
          {
            path: 'faqs',
            component: CourseFaqsComponent,
          },
          {
            path: 'achievements',
            component: CourseAchievementsComponent,
          },
          {
            path: 'task/:taskId',
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
    CourseAchievementsComponent,
    CourseAssignmnetReportComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    NgxEditorModule,
    FormsModule,
    YouTubePlayerModule,
    NgCircleProgressModule.forRoot({}),
    RouterModule.forChild(routes),
    DataTablesModule,
  ],
})
export class CoursesModule {}
