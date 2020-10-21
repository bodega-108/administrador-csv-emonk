import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorexcelComponent } from './lectorexcel.component';

describe('LectorexcelComponent', () => {
  let component: LectorexcelComponent;
  let fixture: ComponentFixture<LectorexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
