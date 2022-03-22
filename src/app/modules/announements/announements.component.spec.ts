import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounementsComponent } from './announements.component';

describe('AnnounementsComponent', () => {
  let component: AnnounementsComponent;
  let fixture: ComponentFixture<AnnounementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnounementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
