import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CscProductosComponent } from './csc-productos.component';

describe('CscProductosComponent', () => {
  let component: CscProductosComponent;
  let fixture: ComponentFixture<CscProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
