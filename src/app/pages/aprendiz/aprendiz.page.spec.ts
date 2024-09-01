import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprendizPage } from './aprendiz.page';

describe('AprendizPage', () => {
  let component: AprendizPage;
  let fixture: ComponentFixture<AprendizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AprendizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
