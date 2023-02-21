using Back_end_Angular_Pokemon.Repositories;

namespace Back_end_Angular_Pokemon.Services
{
    public class EmailService
    {
        private EmailRepository _repository = new EmailRepository();

        public bool checkEmailAlreadyExists(string userEmail)
        {
            return _repository.checkEmailAlreadyExists(userEmail);
        }
    }
}
