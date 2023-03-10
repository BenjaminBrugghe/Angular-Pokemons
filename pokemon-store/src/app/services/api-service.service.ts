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
  private _URL_VERIFY_EMAIL = 'http://localhost:3001/verifyEmail';
  private _URL_VERIFY_PASSWORD = 'http://localhost:3001/verifyPassword';
  private _URL_HASH_PASSWORD = 'http://localhost:3001/hashPassword';

  //#region USERS

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
    const response = await fetch(`${this._URL_USERS}/email/${email}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };

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
   * Modifie les informations d'un utilisateur
   * @param user L'utilisateur à modifier
   * @returns L'utilisateur modifié
   */
  public editUser = async (user: any): Promise<Users> => {
    const response = await fetch(`${this._URL_USERS}/${user.id}`, {
      method: 'PUT',
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
   * Hash le mot de passe de l'utilisateur
   * @param password Le mot de passe à hasher
   * @returns Le mot de passe hashé
   */
  public hashPassword = async (password: string): Promise<any> => {
    const user = {
      password: password,
    };
    const response = await fetch(this._URL_HASH_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.text())
      .catch((error) => console.log(error));
    console.log('response : ', response);
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
  //#endregion

  //#region POKEMONS

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
  //#endregion

  //#region VERIFICATIONS

  /**
   * Vérifie si l'email existe déjà dans la BDD
   * @param email L'email à vérifier
   * @returns true si l'email existe déjà, false sinon
   */
  public checkEmailAlreadyExists = async (email: string): Promise<boolean> => {
    const user = {
      email: email,
    };
    const response = await fetch(this._URL_VERIFY_EMAIL, {
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
   * Vérifie si le mot de passe est valide
   * @param email L'email saisie par l'utilisateur
   * @param password Le mot de passe saisie par l'utilisateur
   * @returns true si le mot de passe est valide, false sinon
   */
  public checkPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const user = {
      email: email,
      password: password,
    };
    const response = await fetch(this._URL_VERIFY_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json().catch((error) => console.log(error)));
    return response;
  };

  //#endregion

  //#region TOKENS

  /**
   * Crée un token pour l'utilisateur
   * @param user L'utilisateur pour lequel on crée le token
   * @returns Le token créé
   */
  public createToken = async (user: any): Promise<any> => {
    const response = await fetch(this._URL_CREATE_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.json().then((error) => Promise.reject(error));
        }
      })
      .catch((error) => console.log(error));
    return response;
  };

  /**
   * Vérifie si le token est valide
   * @param token Le token à vérifier
   * @returns Le token si valide, false sinon
   */
  public verifyToken = async (token: string) => {
    const response = await fetch(this._URL_VERIFY_TOKEN, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  };
  //#endregion
}
