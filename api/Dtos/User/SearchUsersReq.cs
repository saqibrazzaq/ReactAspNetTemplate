using api.Utility.Paging;

namespace api.Dtos.User
{
    public class SearchUsersReq : PagedReq
    {
        public int AccountId { get; set; } = 0;
    }
}
