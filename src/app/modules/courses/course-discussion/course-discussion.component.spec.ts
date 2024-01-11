import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDiscussionComponent } from './course-discussion.component';

describe('CourseDiscussionComponent', () => {
  let component: CourseDiscussionComponent;
  let fixture: ComponentFixture<CourseDiscussionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDiscussionComponent]
    });
    fixture = TestBed.createComponent(CourseDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
