using api.Dtos.User;
using api.Entities;
using api.Utility.Paging;

namespace api.Repository.Interfaces
{
    public interface IUserRepository
    {
        PagedList<AppIdentityUser> SearchUsers(
            SearchUsersRequestDto dto, bool trackChanges);
    }
}
