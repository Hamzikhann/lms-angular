import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskTypeAssessmentComponent } from './course-task-type-assessment.component';

describe('CourseTaskTypeAssessmentComponent', () => {
  let component: CourseTaskTypeAssessmentComponent;
  let fixture: ComponentFixture<CourseTaskTypeAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskTypeAssessmentComponent]
    });
    fixture = TestBed.createComponent(CourseTaskTypeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
