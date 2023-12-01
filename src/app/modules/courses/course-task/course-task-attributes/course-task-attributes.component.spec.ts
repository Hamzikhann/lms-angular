import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTaskAttributesComponent } from './course-task-attributes.component';

describe('CourseTaskAttributesComponent', () => {
  let component: CourseTaskAttributesComponent;
  let fixture: ComponentFixture<CourseTaskAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTaskAttributesComponent]
    });
    fixture = TestBed.createComponent(CourseTaskAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
