import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdbComponent } from './gdb.component';

describe('GdbComponent', () => {
  let component: GdbComponent;
  let fixture: ComponentFixture<GdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
