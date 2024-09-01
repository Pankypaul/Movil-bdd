import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilAgregarAmigosPage } from './perfil-agregar-amigos.page';

describe('PerfilAgregarAmigosPage', () => {
  let component: PerfilAgregarAmigosPage;
  let fixture: ComponentFixture<PerfilAgregarAmigosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAgregarAmigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
