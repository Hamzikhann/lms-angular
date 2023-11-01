import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAboutComponent } from './course-about.component';

describe('CourseAboutComponent', () => {
  let component: CourseAboutComponent;
  let fixture: ComponentFixture<CourseAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAboutComponent]
    });
    fixture = TestBed.createComponent(CourseAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
