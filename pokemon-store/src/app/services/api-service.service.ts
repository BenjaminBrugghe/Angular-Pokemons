import { Injectable } from '@angular/core';
import Users from '../models/Users';
import Pokemons from '../models/Pokemons';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor() {}

  // Devrait provenir d'un fichier .env
  private _URL_USERS = 'http://localhost:3001/users';
  private _URL_POKEMONS = 'http://localhost:3001/pokemons';
  private _URL_CREATE_TOKEN = 'http://localhost:3001/createToken';
  private _URL_VERIFY_TOKEN = 'http://localhost:3001/verifyToken';

  // ******************** USERS ********************

  // ********** GET **********

  /**
   * Récupère la liste des utilisateurs
   * @returns La liste des utilisateurs
   */
  public getAllUsers = async (): Promise<Users> => {
    const response = await fetch(this._URL_USERS)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };

  /**
   * Récupère un utilisateur par son id
   * @param id L'id de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'id
   */
  public getUserById = async (id: number): Promise<Users> => {
    const response = await fetch(`${this._URL_USERS}/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };

  /**
   * Récupère un utilisateur par son email
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public getUserByEmail = async (email: string): Promise<Users> => {
    const response = await this.getAllUsers()
      .then((response) => response.find((user: Users) => user.email === email))
      .catch((error) => console.log(error));
    return response;
  };

  // ********** POST **********

  /**
   * Crée un nouvel utilisateur
   * @param user L'utilisateur à créer
   * @returns L'utilisateur créé
   */
  public createUser = async (user: any): Promise<Users> => {
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
  };

  /**
   * Ajoute le pokémon cliqué au panier de l'utilisateur
   * @param id L'id de l'utilisateur
   * @param pokemon Le pokémon qui a été cliqué
   * @returns L'utilisateur avec le pokémon ajouté au panier
   */
  public addToCart = async (id: number, pokemon: Pokemons): Promise<Users> => {
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
  };

  // ******************** POKEMONS ********************

  // ********** GET **********

  /**
   * Récupère la liste des pokémons
   * @returns La liste des pokémons
   */
  public getAllPokemons = async (): Promise<Pokemons[]> => {
    const response = await fetch(this._URL_POKEMONS)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };

  // ******************** VERIFICATIONS ********************

  /**
   * Vérifie si l'email existe déjà dans la BDD
   * @param email L'email à vérifier
   * @returns true si l'email existe déjà, false sinon
   */
  public checkEmailAlreadyExists = async (email: string): Promise<any> => {
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
  };

  // ******************** TOKEN ********************

  public createToken = async (user: any) => {
    console.log('********** api-service  **********'); // **********************************
    const response = await fetch(this._URL_CREATE_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };

  public verifyToken = async (token: string) => {
    const response = await fetch(this._URL_VERIFY_TOKEN, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };
}
