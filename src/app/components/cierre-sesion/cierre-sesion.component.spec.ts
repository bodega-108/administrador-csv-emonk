import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreSesionComponent } from './cierre-sesion.component';

describe('CierreSesionComponent', () => {
  let component: CierreSesionComponent;
  let fixture: ComponentFixture<CierreSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
