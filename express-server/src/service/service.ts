import User from "../models/user";
import Pokemon from "../models/pokemons";
import Repository from "../repository/repository";
import bcrypt from "bcrypt";

// Pour la persistance des données en JSON
const { readFileSync } = require("fs");
let userListJson = JSON.parse(readFileSync("src/data/users.json", "utf-8"));

/**
 * Génère une ID unique (qui sera la plus grande déjà existante + 1)
 * @param userList La liste des utilisateurs
 * @returns Une nouvelle ID unique
 */
const getUniqueId = (userList: User[]): number => {
  const userIds = userList.map((user) => user.id);
  const maxId = userIds.reduce((acc, b) => Math.max(acc, b));
  const IdUnique = maxId + 1;
  return IdUnique;
};

export default class Service {
  _repository: Repository;

  constructor(repository: Repository) {
    this._repository = repository;
  }

  //#region USERS
  /**
   * Appelle la méthode getAllUsers() du repository
   * @returns La liste des utilisateurs
   */
  public getAllUsers = (): User[] => {
    return this._repository.getAllUsers();
  };

  /**
   * Appelle la méthode getUserById() du repository
   * @param id L'id de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'id
   */
  public getUserById = (id: number): User => {
    const result = this._repository.getUserById(id);
    if (!result) throw "Erreur, id introuvable";
    return result;
  };

  /**
   * Appelle la méthode getUserByEmail() du repository
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public getUserByEmail = (email: string): User => {
    const result = this._repository.getUserByEmail(email);
    if (!result) throw "Erreur, email introuvable";
    return result;
  };

  /**
   * Crée un nouvel utilisateur et appelle la méthode createUser() du repository
   * @param firstName Le prénom de l'utilisateur
   * @param lastName Le nom de l'utilisateur
   * @param email L'email de l'utilisateur
   * @param password Le mot de passe de l'utilisateur
   * @returns L'utilisateur créé
   */
  public createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> => {
    // Génère une ID unique
    const uniqueId = getUniqueId(userListJson);

    // Hashage du mot de passe
    const cryptedPassword = await this.hashPassword(password);

    // Crée un nouvel utilisateur
    const newUser = new User(
      uniqueId,
      firstName,
      lastName,
      email,
      cryptedPassword
    );
    this._repository.createUser(newUser);
    return newUser;
  };

  /**
   * Met à jour les informations d'un utilisateur et appelle la méthode updateUser() du repository
   * @param id L'id de l'utilisateur à mettre à jour
   * @param firstName Le nouveau prénom de l'utilisateur
   * @param lastName Le nouveau nom de l'utilisateur
   * @param email Le nouveau email de l'utilisateur
   * @param password Le nouveau mot de passe de l'utilisateur
   * @returns L'utilisateur mis à jour
   */
  public updateUser = (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cart: Pokemon[]
  ): User => {
    // Récupère l'index de l'utilisateur à mettre à jour
    const index = this._repository.getAllUsers().indexOf(this.getUserById(id));
    if (index.toString() == "") throw "Erreur, id introuvable";

    // Récupère l'utilisateur et met à jour ses informations
    const userToUpdate = this._repository.getAllUsers()[index];
    userToUpdate.firstname = firstName;
    userToUpdate.lastname = lastName;
    userToUpdate.email = email;
    userToUpdate.password = password;
    userToUpdate.cart = cart;

    this._repository.updateUser(index, userToUpdate);
    return userToUpdate;
  };
  //#endregion

  //#region POKEMONS

  /**
   * Appelle la méthode getAllPokemons() du repository
   */
  public getAllPokemons = (): Pokemon[] => {
    return this._repository.getAllPokemons();
  };
  //#endregion

  //#region TOKENS
  /**
   * Vérifie les informations de l'utilisateur et appelle la méthode createToken() du repository
   * @param email L'email de l'utilisateur à authentifier
   * @param password Le mot de passe de l'utilisateur à authentifier
   * @returns Le token de l'utilisateur
   */
  public createToken = async (
    email: string,
    password: string
  ): Promise<String> => {
    const userFound = await this.getUserByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!userFound) throw "Erreur, email introuvable";

    // Si l'utilisateur existe et que le mot de passe est correct
    const newToken = await this._repository.createToken(userFound);
    return newToken;
  };

  /**
   * Appele la méthode verifyToken() du repository
   * @param token Le token à vérifier
   * @returns Le token décodé
   */
  public verifyToken = async (token: string): Promise<User> => {
    const decodedToken = this._repository.verifyToken(token);
    if (!decodedToken) throw "Erreur, token invalide";
    return decodedToken;
  };
  //#endregion

  //#region HASH PASSWORD

  /**
   * Hash le mot de passe de l'utilisateur
   * @param password Le mot de passe à hasher
   * @returns Le mot de passe hashé
   */
  public hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  //#endregion

  //#region VERIFICATIONS

  /**
   * Récupère l'utilisateur correspondant à l'email et vérifie le mot de passe saisie avec le mot de passe hashé
   * @param userEmail L'email de l'utilisateur à vérifier
   * @param userPassword Le mot de passe de l'utilisateur à vérifier
   * @returns True si le mot de passe est correct, false sinon
   */
  public verifyHashPassword = async (
    userEmail: string,
    userPassword: string
  ): Promise<boolean> => {
    const userFound = await this.getUserByEmail(userEmail);
    const result = await bcrypt.compare(userPassword, userFound.password);
    return result;
  };

  /**
   * Vérifie si l'email de l'utilisateur existe déjà
   * @param email L'email de l'utilisateur à vérifier
   * @returns True si l'email existe déjà, false sinon
   */
  public verifyEmailAlreadyExists = async (email: string): Promise<boolean> => {
    const userFound = await this._repository.verifyEmailAlreadyExists(email);
    if (userFound) return true;
    return false;
  };

  //#endregion
}
