import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUsefulLinksComponent } from './course-useful-links.component';

describe('CourseUsefulLinksComponent', () => {
  let component: CourseUsefulLinksComponent;
  let fixture: ComponentFixture<CourseUsefulLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseUsefulLinksComponent]
    });
    fixture = TestBed.createComponent(CourseUsefulLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
