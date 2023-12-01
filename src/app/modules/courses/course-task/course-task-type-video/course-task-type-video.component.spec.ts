import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskTypeVideoComponent } from './course-task-type-video.component';

describe('CourseTaskTypeVideoComponent', () => {
  let component: CourseTaskTypeVideoComponent;
  let fixture: ComponentFixture<CourseTaskTypeVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskTypeVideoComponent]
    });
    fixture = TestBed.createComponent(CourseTaskTypeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
