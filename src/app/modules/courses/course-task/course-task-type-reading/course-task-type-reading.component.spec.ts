import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskTypeReadingComponent } from './course-task-type-reading.component';

describe('CourseTaskTypeReadingComponent', () => {
  let component: CourseTaskTypeReadingComponent;
  let fixture: ComponentFixture<CourseTaskTypeReadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskTypeReadingComponent]
    });
    fixture = TestBed.createComponent(CourseTaskTypeReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
