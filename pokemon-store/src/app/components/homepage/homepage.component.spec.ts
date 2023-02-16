import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **********************************************

  describe('resetCheckbox()', () => {
    it('should reset the value of checkboxValue, checkboxValue_2 et checkedCounter', () => {
      component.resetCheckbox();
      expect(component.checkboxValue).toBe('');
      expect(component.checkboxValue_2).toBe('');
      expect(component.checkedCounter).toBe(0);
    });
  });

  describe('resetSearchbarInput()', () => {
    it('should reset the value of searchbarInput', () => {
      component.resetSearchbarInput();
      expect(component.searchbarInput).toBe('');
    });
  });
});
