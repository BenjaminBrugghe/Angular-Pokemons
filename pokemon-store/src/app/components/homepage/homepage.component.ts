import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Pokemons from 'src/app/models/Pokemons';
import Users from 'src/app/models/Users';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  private _service = new ApiServiceService();

  public pokemonList: Pokemons[] = [];
  public user!: Users;

  public searchbarInput: string = '';

  public checkboxValue: string = '';
  public checkboxValue_2: string = '';

  /**
   * Affiche les pokémons triés par type en fonction de l'input qui a été cliqué.
   * Reset la valeur de l'input text de la searchbar.
   */
  public onCheckboxChange(event: any): void {
    event.target.checked
      ? (this.checkboxValue = event.target.value)
      : (this.checkboxValue = '');
    this.searchbarInput = '';
  }

  /**
   * Reset la valeur de l'input checkbox si on écrit dans l'input text de la searchbar.
   */
  public resetCheckbox(): void {
    this.checkboxValue = '';
  }

  async ngOnInit(): Promise<void> {
    // Récupère la liste des pokémons
    this.pokemonList = await this._service.getAllPokemons();

    // Récupère l'utilisateur connecté via le localStorage
    const id = localStorage.getItem('id');
    if (id) {
      this.user = await this._service.getUserById(+id);
    }
  }
}
