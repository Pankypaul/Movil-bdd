import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAsignaturaPage } from './menu-asignatura.page';

describe('MenuAsignaturaPage', () => {
  let component: MenuAsignaturaPage;
  let fixture: ComponentFixture<MenuAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
