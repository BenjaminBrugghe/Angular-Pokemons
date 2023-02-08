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
  constructor() {}
  private _service = new ApiServiceService();

  public pokemonList: Pokemons[] = [];
  public user!: Users;

  public searchbarInput: string = '';

  public checkboxValue: string = '';
  public checkboxValue_2: string = '';

  // Pour Disable les autres checkbox lorsque 2 sont cliquées
  public checkedCounter: number = 0;

  // Pour décocher les checkbox lorsqu'on écrit dans la searchbar
  public checkbox: any;

  /**
   * Affiche les pokémons triés par type en fonction des checkbox cliquées.
   * Reset la valeur de l'input text de la searchbar.
   */
  public onCheckboxChange(event: any): void {
    // Lorsqu'on coche une checkbox
    if (event.target.checked) {
      this.checkboxClicked(event);
    } else {
      // Lorsqu'on décoche une checkbox
      this.checkboxUnclicked(event);
    }
    // Reset la valeur de l'input text de la searchbar
    this.resetSearchbarInput();
  }

  /**
   * Si aucune checkbox n'est cochée, récupère la value 1, sinon la value 2
   */
  public checkboxClicked(event: any): void {
    this.checkboxValue == ''
      ? (this.checkboxValue = event.target.value)
      : (this.checkboxValue_2 = event.target.value);
    this.checkedCounter++;
  }

  /**
   * Met à jour les valeurs des checkbox en fonction de celle qui est décochée
   */
  public checkboxUnclicked(event: any): void {
    if (this.checkboxValue_2 != '') {
      // Si 2 checkbox sont cochées
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
    this.checkedCounter--;
  }

  /**
   * Reset les valeurs et décoche les inputs checkbox et le counter si on écrit dans la searchbar.
   */
  public resetCheckbox(): void {
    // Reset les valeurs et le counter
    this.checkboxValue = '';
    this.checkboxValue_2 = '';
    this.checkedCounter = 0;

    // Décoche les checkbox
    this.checkbox = document.querySelectorAll('input[type="checkbox"]');
    this.checkbox.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  }

  /**
   * Reset la valeur de l'input text de la searchbar si on coche une checkbox.
   */
  public resetSearchbarInput(): void {
    this.searchbarInput = '';
  }

  /**
   * Récupère l'utilisateur connecté via le localStorage et la liste des pokémons.
   */
  async ngOnInit(): Promise<void> {
    // Récupère la liste des pokémons
    this.pokemonList = await this._service.getAllPokemons();

    // Récupère l'utilisateur connecté via le localStorage
    const id = localStorage.getItem('id');
    if (id) {
      this.user = await this._service.getUserById(+id);
    }
  }

  /**
   * Reset les checkbox si on écrit dans la searchbar.
   */
  ngDoCheck(): void {
    if (this.searchbarInput != '') {
      this.resetCheckbox();
    }
  }
}
