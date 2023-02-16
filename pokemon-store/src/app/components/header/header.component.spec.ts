import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ************************************************

  describe('ngDoCheck()', () => {
    it('should set userIsLogged to true if token is in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('token');
      component.ngDoCheck();
      expect(component.userIsLogged).toBeTrue();
    });
    it('should set userIsLogged to false if token is not in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      component.ngDoCheck();
      expect(component.userIsLogged).toBeFalse();
    });
  });

  describe('logout()', () => {
    it('should remove token from localStorage', () => {
      spyOn(localStorage, 'removeItem');
      component.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
    it('should navigate to /', () => {
      spyOn(router, 'navigate');
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
