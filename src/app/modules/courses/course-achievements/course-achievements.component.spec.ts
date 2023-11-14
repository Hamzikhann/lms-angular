import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAchievementsComponent } from './course-achievements.component';

describe('CourseAchievementsComponent', () => {
  let component: CourseAchievementsComponent;
  let fixture: ComponentFixture<CourseAchievementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAchievementsComponent]
    });
    fixture = TestBed.createComponent(CourseAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
