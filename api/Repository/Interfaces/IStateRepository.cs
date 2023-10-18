using api.Dtos.Country;
using api.Entities;
using api.Utility.Paging;

namespace api.Repository.Interfaces
{
    public interface IStateRepository : IRepositoryBase<State>
    {
        PagedList<State> SearchStates(StateSearchReq dto, bool trackChanges);
    }
}
