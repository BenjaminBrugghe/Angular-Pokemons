import { Injectable } from '@angular/core';
import Users from '../models/Users';
import Pokemons from '../models/Pokemons';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor() {}

  // Devrait être dans un fichier .env
  private _URL_USERS = 'http://localhost:3000/users';
  private _URL_POKEMONS = 'http://localhost:3000/pokemons';

  // ******************** USERS ********************

  // ********** GET **********

  /**
   * Récupère la liste des utilisateurs
   * @returns La liste des utilisateurs
   */
  public async getAllUsers(): Promise<Users> {
    const response = await fetch(this._URL_USERS)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }

  /**
   * Récupère un utilisateur par son id
   * @param id L'id de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'id
   */
  public async getUserById(id: number): Promise<Users> {
    const response = await fetch(`${this._URL_USERS}/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }

  /**
   * Récupère un utilisateur par son email
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public async getUserByEmail(email: string): Promise<Users> {
    const response = await this.getAllUsers()
      .then((response) => response.find((user: Users) => user.email === email))
      .catch((error) => console.log(error));
    return response;
  }

  // ********** POST **********

  /**
   * Crée un nouvel utilisateur
   * @param user L'utilisateur à créer
   * @returns L'utilisateur créé
   */
  public async createUser(user: any): Promise<Users> {
    const response = await fetch(this._URL_USERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }

  /**
   * Ajoute le pokémon cliqué au panier de l'utilisateur
   * @param id L'id de l'utilisateur
   * @param pokemon Le pokémon qui a été cliqué
   * @returns L'utilisateur avec le pokémon ajouté au panier
   */
  public async addToCart(id: number, pokemon: Pokemons): Promise<Users> {
    const userFound = await this.getUserById(id);
    userFound.cart.push(pokemon);

    const response = await fetch(`${this._URL_USERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFound),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }

  // ******************** POKEMONS ********************

  // ********** GET **********

  /**
   * Récupère la liste des pokémons
   * @returns La liste des pokémons
   */
  public async getAllPokemons(): Promise<Pokemons[]> {
    const response = await fetch(this._URL_POKEMONS)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }

  // ******************** VERIFICATIONS ********************

  /**
   * Vérifie si l'email existe déjà dans la BDD
   * @param email L'email à vérifier
   * @returns true si l'email existe déjà, false sinon
   */
  public async checkEmailAlreadyExists(email: string): Promise<any> {
    const userList = await this.getAllUsers();
    try {
      const userFound = await userList.find(
        (user: Users) => user.email === email
      );
      if (userFound) return true;
      return false;
    } catch (error) {
      return console.log(error);
    }
  }
}
