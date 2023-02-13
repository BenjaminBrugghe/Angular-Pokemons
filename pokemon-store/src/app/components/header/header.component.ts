import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public userIsLogged: boolean = false;

  /**
   * Vérifie si un utilisateur est connecté pour afficher ou non les icones
   */
  ngDoCheck(): void {
    if (localStorage.getItem('token')) {
      this.userIsLogged = true;
    } else {
      this.userIsLogged = false;
    }
  }

  /**
   * Déconnecte l'utilisateur, supprime le token du localStorage et redirige vers la page d'accueil
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
