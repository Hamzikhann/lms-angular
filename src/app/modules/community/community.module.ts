import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionsAskComponent } from './questions-ask/questions-ask.component';
import { QuestionsUpdateComponent } from './questions-update/questions-update.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
  },
  {
    path: 'question/:id',
    component: QuestionsDetailComponent,
  },
  {
    path: 'question-ask',
    component: QuestionsAskComponent,
  },
  {
    path: 'question/:id/update',
    component: QuestionsUpdateComponent,
  },
];

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsAskComponent,
    QuestionsUpdateComponent,
    QuestionsDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class CommunityModule {}
