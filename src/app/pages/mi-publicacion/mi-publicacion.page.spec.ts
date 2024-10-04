import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiPublicacionPage } from './mi-publicacion.page';

describe('MiPublicacionPage', () => {
  let component: MiPublicacionPage;
  let fixture: ComponentFixture<MiPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
