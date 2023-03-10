import { Request, Response } from "express";
import Pokemons from "../models/pokemons";
import User from "../models/user";
import Service from "../service/service";

export default class Controller {
  _service: Service;

  constructor(service: Service) {
    this._service = service;
  }

  //#region USERS

  /**
   * Appelle la méthode getAllUsers() du service
   */
  public getAllUsers = (req: Request, res: Response): void => {
    res.send(this._service.getAllUsers());
  };

  /**
   * Appelle la méthode getUserById() du service
   */
  public getUserById = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    res.send(this._service.getUserById(+id));
  };

  /**
   * Appelle la méthode getUserByEmail() du service
   */
  public getUserByEmail = (req: Request, res: Response): void => {
    const email: string = req.params.email;
    res.send(this._service.getUserByEmail(email));
  };

  /**
   * Récupère les données du body et appelle la méthode createUser() du service
   */
  public createUser = (req: Request, res: Response): void => {
    const lastname: string = req.body.lastname;
    const firstname: string = req.body.firstname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser: Promise<User> = this._service.createUser(
      firstname,
      lastname,
      email,
      password
    );
    res.send(newUser);
  };

  /**
   * Récupère les données du body et appelle la méthode updateUser() du service
   */
  public updateUser = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const lastname: string = req.body.lastname;
    const firstname: string = req.body.firstname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const cart: Pokemons[] = req.body.cart;
    const updatedUser: User = this._service.updateUser(
      +id,
      lastname,
      firstname,
      email,
      password,
      cart
    );
    res.send(updatedUser);
  };

  //#endregion

  //#region POKEMONS
  /**
   * Appelle la méthode getAllPokemons() du service
   */
  public getAllPokemons = (req: Request, res: Response): void => {
    res.send(this._service.getAllPokemons());
  };
  //#endregion

  //#region TOKENS

  /**
   * Récupère les données du body et appelle la méthode createToken() du service
   */
  public createToken = async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
      const token = await this._service.createToken(email, password);
      res.send(token);
    } catch (error) {
      res.send(error);
    }
  };

  /**
   * Récupère le token dans l'authorization du headers et appelle la méthode verifyToken() du service
   */
  public verifyToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization!;
    try {
      const result = await this._service.verifyToken(token);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };

  //#endregion

  //#region VERIFICATIONS

  /**
   * Récupère les données du body et appelle la méthode hashPassword() du service
   */
  public hashPassword = async (req: Request, res: Response): Promise<void> => {
    const password = req.body.password;
    try {
      const result = await this._service.hashPassword(password);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };

  /**
   * Récupère les données du body et appelle la méthode verifyHashPassword() du service
   */
  public verifyHashPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const result = await this._service.verifyHashPassword(email, password);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };

  /**
   * Récupère les données du body et appelle la méthode verifyEmailAlreadyExists() du service
   */
  public verifyEmailAlreadyExists = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const email = req.body.email;
    try {
      const result = await this._service.verifyEmailAlreadyExists(email);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };

  //#endregion
}
