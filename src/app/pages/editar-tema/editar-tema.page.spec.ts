import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTemaPage } from './editar-tema.page';

describe('EditarTemaPage', () => {
  let component: EditarTemaPage;
  let fixture: ComponentFixture<EditarTemaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
