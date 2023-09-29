using api.Data;
using api.Entities;
using api.Repository.Interfaces;

namespace api.Repository.Implementations
{
    public class AccountRepository : RepositoryBase<Account>, IAccountRepository
    {
        public AccountRepository(AppDbContext context) : base(context)
        {
        }
    }
}
