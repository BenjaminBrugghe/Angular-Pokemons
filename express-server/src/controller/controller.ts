import { Request, Response } from "express";
import User from "../models/user";
import Service from "../service/service";

export default class Controller {
  _service: Service;

  constructor(service: Service) {
    this._service = service;
  }

  // ********************* USERS *********************

  /**
   * Appelle la méthode getAllUsers() du service
   */
  public getAllUsers(res: Response): void {
    res.send(this._service.getAllUsers());
  }

  /**
   * Appelle la méthode getUserById() du service
   */
  public getUserById(req: Request, res: Response): void {
    const id: string = req.params.id;
    res.send(this._service.getUserById(+id));
  }

  /**
   * Appelle la méthode getUserByEmail() du service
   */
  public getUserByEmail(req: Request, res: Response): void {
    const email: string = req.params.email;
    res.send(this._service.getUserByEmail(email));
  }

  /**
   * Récupère les données du body et appelle la méthode createUser() du service
   */
  public createUser(req: Request, res: Response): void {
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser: User = this._service.createUser(
      firstname,
      lastname,
      email,
      password
    );
    res.send(newUser);
  }

  /**
   * Récupère les données du body et appelle la méthode updateUser() du service
   */
  public updateUser(req: Request, res: Response): void {
    const id: string = req.params.id;
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const updatedUser: User = this._service.updateUser(
      +id,
      firstname,
      lastname,
      email,
      password
    );
    res.send(updatedUser);
  }

  // ********************* POKEMONS *********************

  /**
   * Appelle la méthode getAllPokemons() du service
   */
  public getAllPokemons(res: Response): void {
    res.send(this._service.getAllPokemons());
  }

  // ********************* TOKENS *********************

  /**
   * Récupère les données du body et appelle la méthode createToken() du service
   */
  public async createToken(req: Request, res: Response): Promise<void> {
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
      const token = await this._service.createToken(email, password);
      res.send(token);
    } catch (error) {
      res.send(error);
    }
  }

  /**
   * Récupère le token dans l'authorization du headers et appelle la méthode verifyToken() du service
   */
  public async verifyToken(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization!;
    try {
      const result = await this._service.verifyToken(token);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
}
