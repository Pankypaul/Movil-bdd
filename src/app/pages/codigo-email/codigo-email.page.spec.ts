import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoEmailPage } from './codigo-email.page';

describe('CodigoEmailPage', () => {
  let component: CodigoEmailPage;
  let fixture: ComponentFixture<CodigoEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
