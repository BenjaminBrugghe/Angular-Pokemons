import { Component, Input } from '@angular/core';
import Pokemons from 'src/app/models/Pokemons';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input()
  pokemon!: Pokemons;
}
