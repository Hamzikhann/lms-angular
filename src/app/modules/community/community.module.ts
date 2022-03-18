import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { TopicsComponent } from './topics/topics.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsAskComponent } from './questions-ask/questions-ask.component';
import { QuestionsUpdateComponent } from './questions-update/questions-update.component';

const routes: Routes = [
  {
    path: "",
    component: QuestionsComponent
  }, 
  {
    path: "question-ask",
    component: QuestionsAskComponent
  }, 
  {
    path: "question-update",
    component: QuestionsUpdateComponent
  }, 
  {
    path: "topics",
    component: TopicsComponent
  }
];

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsAskComponent,
    QuestionsUpdateComponent,
    TopicsComponent
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
export class CommunityModule { }
