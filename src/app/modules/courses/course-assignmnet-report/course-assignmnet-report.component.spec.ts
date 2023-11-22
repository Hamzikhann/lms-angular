import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignmnetReportComponent } from './course-assignmnet-report.component';

describe('CourseAssignmnetReportComponent', () => {
  let component: CourseAssignmnetReportComponent;
  let fixture: ComponentFixture<CourseAssignmnetReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAssignmnetReportComponent]
    });
    fixture = TestBed.createComponent(CourseAssignmnetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
