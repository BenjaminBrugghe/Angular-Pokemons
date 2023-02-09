import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public userIsLogged: boolean = false;

  ngDoCheck(): void {
    if (localStorage.getItem('token')) {
      this.userIsLogged = true;
    } else {
      this.userIsLogged = false;
    }
  }

  logout() {
    localStorage.removeItem('token'); // A remplacer par 'token' une fois implémenté
  }
}
