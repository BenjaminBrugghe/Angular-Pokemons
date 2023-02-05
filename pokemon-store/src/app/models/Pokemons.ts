export default class Pokemons {
  id!: number;
  name: string;
  type1: string;
  type2: string;
  evolution: boolean;
  price: number;
  description: string;
  image: string;

  constructor(
    name: string,
    type1: string,
    type2: string,
    evolution: boolean,
    price: number,
    description: string,
    image: string
  ) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.evolution = evolution;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
