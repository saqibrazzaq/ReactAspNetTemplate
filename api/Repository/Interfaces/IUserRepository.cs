using api.Dtos.User;
using api.Entities;
using api.Utility.Paging;

namespace api.Repository.Interfaces
{
    public interface IUserRepository : IRepositoryBase<AppIdentityUser>
    {
        PagedList<AppIdentityUser> SearchUsers(
            SearchUsersReq dto, bool trackChanges);
    }
}
