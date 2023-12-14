import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTocModulesComponent } from './course-toc-modules.component';

describe('CourseTocModulesComponent', () => {
  let component: CourseTocModulesComponent;
  let fixture: ComponentFixture<CourseTocModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTocModulesComponent]
    });
    fixture = TestBed.createComponent(CourseTocModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
