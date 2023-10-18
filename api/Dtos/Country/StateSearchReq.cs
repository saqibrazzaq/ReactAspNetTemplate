using api.Utility.Paging;

namespace api.Dtos.Country
{
    public class StateSearchReq : PagedReq
    {
        public int? CountryId { get; set; }
    }
}
