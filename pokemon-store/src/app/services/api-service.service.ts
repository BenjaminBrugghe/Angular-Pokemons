import { Injectable } from '@angular/core';
import Users from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor() {}

  // Devrait être dans un fichier .env
  private _URL_USERS = 'http://localhost:3000/users';

  // ******************** USERS ********************

  // ********** GET **********

  /**
   * Récupère la liste des utilisateurs
   * @returns La liste des utilisateurs
   */
  public async getAllUsers(): Promise<any> {
    try {
      const response = await fetch(this._URL_USERS);
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  /**
   * Récupère un utilisateur par son email
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public async getUserByEmail(email: string): Promise<any> {
    const userList = await this.getAllUsers();
    try {
      const userFound = userList.find((user: Users) => user.email === email);
      return userFound;
    } catch (error) {
      console.log(error);
    }
  }

  // ********** POST **********

  /**
   * Crée un nouvel utilisateur
   * @param user L'utilisateur à créer
   * @returns L'utilisateur créé
   */
  public async createUser(user: any): Promise<any> {
    try {
      const response = await fetch(this._URL_USERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
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
