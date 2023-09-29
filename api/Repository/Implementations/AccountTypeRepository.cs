using api.Data;
using api.Entities;
using api.Repository.Interfaces;

namespace api.Repository.Implementations
{
    public class AccountTypeRepository : RepositoryBase<AccountType>, IAccountTypeRepository
    {
        public AccountTypeRepository(AppDbContext context) : base(context)
        {
        }
    }
}
