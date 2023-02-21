using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Repositories;

namespace Back_end_Angular_Pokemon.Services
{
    public class PanierService
    {
        private PanierRepository _repository = new PanierRepository();

        public List<Panier> getUserCart(int userId)
        {
            return _repository.getUserCart(userId);
        }
    }
}
