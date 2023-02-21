namespace Back_end_Angular_Pokemon.Models
{
    public class Panier
    {
        private int id;
        private int utilisateurID;
        private int pokemonID;
        private string pokemonName;
        private string pokemonType1;
        private string pokemonType2;
        private string pokemonEvolution;
        private float pokemonPrice;
        private string pokemonDescription;
        private string pokemonImage;

        public Panier() { }

        public Panier(int id, int utilisateurID, int pokemonID, string pokemonName, string pokemonType1, string pokemonType2, string pokemonEvolution, float pokemonPrice, string pokemonDescription, string pokemonImage)
        {
            this.Id = id;
            this.UtilisateurID = utilisateurID;
            this.PokemonID = pokemonID;
            this.PokemonName = pokemonName;
            this.PokemonType1 = pokemonType1;
            this.PokemonType2 = pokemonType2;
            this.PokemonEvolution = pokemonEvolution;
            this.PokemonPrice = pokemonPrice;
            this.PokemonDescription = pokemonDescription;
            this.PokemonImage = pokemonImage;
        }

        public int Id { get => id; set => id = value; }
        public int UtilisateurID { get => utilisateurID; set => utilisateurID = value; }
        public int PokemonID { get => pokemonID; set => pokemonID = value; }
        public string PokemonName { get => pokemonName; set => pokemonName = value; }
        public string PokemonType1 { get => pokemonType1; set => pokemonType1 = value; }
        public string PokemonType2 { get => pokemonType2; set => pokemonType2 = value; }
        public string PokemonEvolution { get => pokemonEvolution; set => pokemonEvolution = value; }
        public float PokemonPrice { get => pokemonPrice; set => pokemonPrice = value; }
        public string PokemonDescription { get => pokemonDescription; set => pokemonDescription = value; }
        public string PokemonImage { get => pokemonImage; set => pokemonImage = value; }
    }
}
