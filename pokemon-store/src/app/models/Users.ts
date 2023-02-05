export default class Users {
  // Pour le 'response.find' de la méthode getUserByEmail
  find(arg0: (user: Users) => boolean): any {
    throw new Error('Method not implemented.');
  }

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
    password: string,
    cart: any[] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.cart = [];
  }
}
