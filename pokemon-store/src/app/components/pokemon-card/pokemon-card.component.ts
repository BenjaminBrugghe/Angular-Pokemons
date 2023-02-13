import { Component, Input } from '@angular/core';
import Pokemons from 'src/app/models/Pokemons';
import Users from 'src/app/models/Users';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { SuccessPopupComponent } from '../snackbars/success-popup/success-popup.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input()
  pokemon!: Pokemons;
  @Input()
  user!: Users;

  private _service = new ApiServiceService();

  public showSuccessPopup: boolean = false;

  public async addToCart(): Promise<void> {
    await this._service.addToCart(this.user.id, this.pokemon);

    // Affiche la popup de succès
    this.showSuccessPopup = true;

    // Reset le booleen après 5s, pour pouvoir réafficher la popup sur le même pokemon
    window.setTimeout(() => {
      this.showSuccessPopup = false;
    }, 5000);
  }
}
