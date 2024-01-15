import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTocComponent } from './course-toc.component';

describe('CourseTocComponent', () => {
  let component: CourseTocComponent;
  let fixture: ComponentFixture<CourseTocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTocComponent]
    });
    fixture = TestBed.createComponent(CourseTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
