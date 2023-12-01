import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskDescriptionComponent } from './course-task-description.component';

describe('CourseTaskDescriptionComponent', () => {
  let component: CourseTaskDescriptionComponent;
  let fixture: ComponentFixture<CourseTaskDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskDescriptionComponent]
    });
    fixture = TestBed.createComponent(CourseTaskDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
