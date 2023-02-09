import User from "../models/user";
import Pokemon from "../models/pokemons";
import "dotenv/config";

// Pour les JWT
const _jwt = require("jsonwebtoken");
const jwt_Secret = process.env.JWT_SECRET;

// Pour la persistance des données en JSON
const { readFileSync, writeFileSync } = require("fs");
let userListJson = JSON.parse(readFileSync("src/data/users.json", "utf-8"));
let pokemonListJson = JSON.parse(
  readFileSync("src/data/pokemons.json", "utf-8")
);

// Pour mettre à jour la liste 'users'
function updateUserList() {
  const objectToJson = JSON.stringify(userListJson);
  writeFileSync("src/data/users.json", objectToJson);
  console.log("~~ La liste 'users' a été mise à jour ~~");
}

export default class Repository {
  private userList: User[] = userListJson;
  private pokemonList: Pokemon[] = pokemonListJson;

  // ********************* USERS *********************

  /**
   * Récupère la liste des utilisateurs
   * @returns La liste des utilisateurs
   */
  public getAllUsers = (): User[] => {
    return this.userList;
  };

  /**
   * Récupère un utilisateur par son id
   * @param id L'id de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'id
   */
  public getUserById = (id: number): User => {
    return this.userList.find((user) => user.id === id)!;
  };

  /**
   * Récupère un utilisateur par son email
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public getUserByEmail = (email: string): User => {
    return this.userList.find((user) => user.email === email)!;
  };

  /**
   * Crée un nouvel utilisateur
   * @param newUser L'utilisateur à créer
   * @returns L'utilisateur créé (Le dernier dans le tableau)
   */
  public createUser = (newUser: User): User => {
    this.userList.push(newUser);
    updateUserList();
    return this.userList[-1];
  };

  /**
   * Met à jour un utilisateur
   * @param index L'index de l'utilisateur à mettre à jour
   * @param user L'utilisateur à mettre à jour
   * @returns L'utilisateur mis à jour (à l'index donné)
   */
  public updateUser = (index: number, user: User): User => {
    this.userList[index] = user;
    updateUserList();
    return this.userList[index];
  };

  // ********************* POKEMONS *********************

  /**
   * Récupère la liste des pokémons
   * @returns La liste des pokémons
   */
  public getAllPokemons = (): Pokemon[] => {
    return this.pokemonList;
  };

  // ********************* TOKENS *********************

  /**
   * Crée un nouveau token contenant les infos de l'utilisateur
   * @param user L'utilisateur à stocker dans le token
   * @returns Le token créé
   */
  public createToken = (user: User): string => {
    console.log("********** Repository  **********"); // **********************************
    const payload: User = user;
    const newToken = _jwt.sign(payload, jwt_Secret, { expiresIn: "1h" });
    return newToken;
  };

  /**
   * Vérifie le token
   * @param token Le token à vérifier
   * @returns Les informations de l'utilisateur dans le token
   */
  public verifyToken = (token: string): User => {
    const decodedToken = _jwt.verify(token, jwt_Secret);
    return decodedToken;
  };
}
