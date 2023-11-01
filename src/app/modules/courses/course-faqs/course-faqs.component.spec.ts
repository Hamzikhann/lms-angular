import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFaqsComponent } from './course-faqs.component';

describe('CourseFaqsComponent', () => {
  let component: CourseFaqsComponent;
  let fixture: ComponentFixture<CourseFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFaqsComponent]
    });
    fixture = TestBed.createComponent(CourseFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
