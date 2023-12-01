import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CourseTaskComponent } from './course-task.component';
import { CourseTaskAttributesComponent } from './course-task-attributes/course-task-attributes.component';
import { CourseTaskDescriptionComponent } from './course-task-description/course-task-description.component';
import { CourseTaskTranscriptComponent } from './course-task-transcript/course-task-transcript.component';
import { CourseTaskTypeAssessmentComponent } from './course-task-type-assessment/course-task-type-assessment.component';
import { CourseTaskTypeVideoComponent } from './course-task-type-video/course-task-type-video.component';
import { CourseTaskTypeReadingComponent } from './course-task-type-reading/course-task-type-reading.component';
import { CourseTaskNavigationComponent } from './course-task-navigation/course-task-navigation.component';
import { CourseTaskMarkCompleteComponent } from './course-task-mark-complete/course-task-mark-complete.component';

const routes: Routes = [
  {
    path: ':id',
    component: CourseTaskComponent,
  },
];

@NgModule({
  declarations: [
    CourseTaskAttributesComponent,
    CourseTaskDescriptionComponent,
    CourseTaskTranscriptComponent,
    CourseTaskTypeAssessmentComponent,
    CourseTaskTypeVideoComponent,
    CourseTaskTypeReadingComponent,
    CourseTaskNavigationComponent,
    CourseTaskMarkCompleteComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CourseTaskModule {}
