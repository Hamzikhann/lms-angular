import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DataTablesModule } from 'angular-datatables';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { CoursesComponent } from './courses.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { DetailComponent } from './detail/detail.component';
import { LectureComponent } from './detail/lecture/lecture.component';
import { CourseBooksComponent } from './course-eBook/course-books.component';
import { CourseUsefulLinksComponent } from './course-useful-links/course-useful-links.component';
import { CourseFaqsComponent } from './course-faqs/course-faqs.component';
import { CourseTocComponent } from './course-modules/course-toc.component';
import { CourseAboutComponent } from './course-about/course-about.component';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { CourseAchievementsComponent } from './course-achievements/course-achievements.component';
import { CourseAssignmnetReportComponent } from './course-assignmnet-report/course-assignmnet-report.component';
import { CourseTaskComponent } from './course-task/course-task.component';
import { CourseTaskAttributesComponent } from './course-task/course-task-attributes/course-task-attributes.component';
import { CourseTaskDescriptionComponent } from './course-task/course-task-description/course-task-description.component';
import { CourseTaskTranscriptComponent } from './course-task/course-task-transcript/course-task-transcript.component';
import { CourseTaskTypeAssessmentComponent } from './course-task/course-task-type-assessment/course-task-type-assessment.component';
import { CourseTaskTypeVideoComponent } from './course-task/course-task-type-video/course-task-type-video.component';
import { CourseTaskTypeReadingComponent } from './course-task/course-task-type-reading/course-task-type-reading.component';
import { CourseTaskNavigationComponent } from './course-task/course-task-navigation/course-task-navigation.component';
import { CourseTaskMarkCompleteComponent } from './course-task/course-task-mark-complete/course-task-mark-complete.component';
import { CourseTocModulesComponent } from './course-toc-modules/course-toc-modules.component';
import { CourseDiscussionComponent } from './course-discussion/course-discussion.component';

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
            path: 'books/:referenceNo',
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
            path: 'discussion',
            component: CourseDiscussionComponent,
          },
          {
            path: 'task/:taskId',
            //   component: LectureComponent,
            // },
            // {
            //   path: 'task/new/:taskId',
            component: CourseTaskComponent,
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
    CourseTaskComponent,
    CourseTaskAttributesComponent,
    CourseTaskDescriptionComponent,
    CourseTaskTranscriptComponent,
    CourseTaskTypeAssessmentComponent,
    CourseTaskTypeVideoComponent,
    CourseTaskTypeReadingComponent,
    CourseTaskNavigationComponent,
    CourseTaskMarkCompleteComponent,
    CourseTocModulesComponent,
    CourseDiscussionComponent,
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
