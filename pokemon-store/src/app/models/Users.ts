export default class Users {
  // Attributs
  id!: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cart: any[] = [];

  // Constructeur
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
