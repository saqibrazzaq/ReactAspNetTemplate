using api.Data;
using api.Entities;
using api.Repository.Interfaces;

namespace api.Repository.Implementations
{
    public class UserAddressRepository : RepositoryBase<UserAddress>, IUserAddressRepository
    {
        public UserAddressRepository(AppDbContext context) : base(context)
        {
        }
    }
}
