using api.Data;
using api.Entities;
using api.Repository.Interfaces;

namespace api.Repository.Implementations
{
    public class AddressRepository : RepositoryBase<Address>, IAddressRepository
    {
        public AddressRepository(AppDbContext context) : base(context)
        {
        }
    }
}
