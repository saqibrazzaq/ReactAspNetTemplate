using api.Utility.Paging;

namespace api.Dtos.User
{
    public class SearchUsersReq : PagedRequestDto
    {
        public int AccountId { get; set; } = 0;
    }
}
