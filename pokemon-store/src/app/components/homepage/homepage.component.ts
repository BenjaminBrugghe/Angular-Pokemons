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
    // Lorsqu'on coche une checkbox
    if (event.target.checked) {
      this.checkboxValue == '' // Si aucune checkbox n'est cochée, on récupère la value 1, sinon la value 2
        ? (this.checkboxValue = event.target.value)
        : (this.checkboxValue_2 = event.target.value);
    } else {
      // Lorsqu'on décoche une checkbox
      // Si 2 checkbox sont cochées
      if (this.checkboxValue_2 != '') {
        if (event.target.value == this.checkboxValue) {
          // Si la checkbox décochée est la première
          this.checkboxValue = this.checkboxValue_2;
          this.checkboxValue_2 = '';
        } else {
          // Si la checkbox décochée est la deuxième
          this.checkboxValue_2 = '';
        }
      } else {
        // Si 1 seule checkbox est cochée
        this.checkboxValue = '';
      }
    }
    // Reset la valeur de l'input text de la searchbar
    this.resetSearchbarInput();
  }

  /**
   * Reset la valeur de l'input checkbox si on écrit dans l'input text de la searchbar.
   */
  public resetCheckbox(): void {
    this.checkboxValue = '';
  }

  /**
   * Reset la valeur de l'input text de la searchbar si on coche une checkbox.
   */
  public resetSearchbarInput(): void {
    this.searchbarInput = '';
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
