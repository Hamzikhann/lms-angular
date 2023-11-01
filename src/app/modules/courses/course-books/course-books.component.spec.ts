import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBooksComponent } from './course-books.component';

describe('CourseBooksComponent', () => {
  let component: CourseBooksComponent;
  let fixture: ComponentFixture<CourseBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBooksComponent]
    });
    fixture = TestBed.createComponent(CourseBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
