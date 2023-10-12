using api.Utility.Paging;

namespace api.Dtos.User
{
    public class SearchUsersRequestDto : PagedRequestDto
    {
        public int AccountId { get; set; } = 0;
    }
}
