export default class Users {
  id!: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cart: any[] = [];

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.cart = [];
  }
}
