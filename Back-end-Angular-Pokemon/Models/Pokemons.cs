namespace Back_end_Angular_Pokemon.Models
{
    public class Pokemons
    {
        private int id;
        private string name;
        private string type1;
        private string type2;
        private string evolution;
        private float price;
        private string description;
        private string image;

        public Pokemons()
        {
        }

        public Pokemons(int id, string name, string type1, string type2, string evolution, float price, string description, string image)
        {
            this.Id = id;
            this.Name = name;
            this.Type1 = type1;
            this.Type2 = type2;
            this.Evolution = evolution;
            this.Price = price;
            this.Description = description;
            this.Image = image;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Type1 { get => type1; set => type1 = value; }
        public string Type2 { get => type2; set => type2 = value; }
        public string Evolution { get => evolution; set => evolution = value; }
        public float Price { get => price; set => price = value; }
        public string Description { get => description; set => description = value; }
        public string Image { get => image; set => image = value; }
    }
}
