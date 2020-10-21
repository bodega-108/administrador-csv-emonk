import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarImagenesComponent } from './cargar-imagenes.component';

describe('CargarImagenesComponent', () => {
  let component: CargarImagenesComponent;
  let fixture: ComponentFixture<CargarImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
