import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoContrasenaPage } from './codigo-contrasena.page';

describe('CodigoContrasenaPage', () => {
  let component: CodigoContrasenaPage;
  let fixture: ComponentFixture<CodigoContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
