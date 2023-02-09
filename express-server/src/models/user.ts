export default class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cart: any[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.cart = [];
  }
}
