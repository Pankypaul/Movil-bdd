import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarPage } from './publicar1.page';

describe('Publicar1Page', () => {
  let component: PublicarPage;
  let fixture: ComponentFixture<PublicarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});