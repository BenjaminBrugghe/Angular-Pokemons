import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  public _service: ApiServiceService = new ApiServiceService();

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Récupère le token dans le localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Vérifie si le token est valide
      const decodedToken = await this._service.verifyToken(token);
      if (decodedToken) {
        // Si le token est valide
        return true;
      }
    }

    // Si le token est invalide, redirige vers la page unauthorized
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
