import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskNavigationComponent } from './course-task-navigation.component';

describe('CourseTaskNavigationComponent', () => {
  let component: CourseTaskNavigationComponent;
  let fixture: ComponentFixture<CourseTaskNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskNavigationComponent]
    });
    fixture = TestBed.createComponent(CourseTaskNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
