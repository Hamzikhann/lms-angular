import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskMarkCompleteComponent } from './course-task-mark-complete.component';

describe('CourseTaskMarkCompleteComponent', () => {
  let component: CourseTaskMarkCompleteComponent;
  let fixture: ComponentFixture<CourseTaskMarkCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskMarkCompleteComponent]
    });
    fixture = TestBed.createComponent(CourseTaskMarkCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
