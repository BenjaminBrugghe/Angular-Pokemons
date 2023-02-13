export default class Users {
  id!: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cart: any[] = [];

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
    this.cart = [];
  }
}
