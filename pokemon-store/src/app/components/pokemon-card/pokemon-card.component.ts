import { Component, Input } from '@angular/core';
import Pokemons from 'src/app/models/Pokemons';
import Users from 'src/app/models/Users';
import { ApiServiceService } from 'src/app/services/api-service.service';

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

  public async addToCart(): Promise<void> {
    await this._service.addToCart(this.user.id, this.pokemon);
  }
}
