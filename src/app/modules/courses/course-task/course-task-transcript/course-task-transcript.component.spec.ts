import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskTranscriptComponent } from './course-task-transcript.component';

describe('CourseTaskTranscriptComponent', () => {
  let component: CourseTaskTranscriptComponent;
  let fixture: ComponentFixture<CourseTaskTranscriptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskTranscriptComponent]
    });
    fixture = TestBed.createComponent(CourseTaskTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
