import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutoresPage } from './tutores.page';

describe('TutoresPage', () => {
  let component: TutoresPage;
  let fixture: ComponentFixture<TutoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
