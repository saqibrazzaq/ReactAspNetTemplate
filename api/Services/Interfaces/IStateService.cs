using api.Dtos.Country;
using api.Utility.Paging;

namespace api.Services.Interfaces
{
    public interface IStateService
    {
        StateRes Create(StateEditReq dto);
        StateRes Update(int stateId, StateEditReq dto);
        void Delete(int stateId);
        StateRes Get(int stateId);
        ApiOkPagedResponse<IEnumerable<StateRes>, MetaData> Search(StateSearchReq dto);
    }
}
