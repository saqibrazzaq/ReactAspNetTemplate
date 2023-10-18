using api.Data;
using api.Dtos.Country;
using api.Entities;
using api.Repository.Interfaces;
using api.Utility.Paging;

namespace api.Repository.Implementations
{
    public class StateRepository : RepositoryBase<State>, IStateRepository
    {
        public StateRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<State> SearchStates(StateSearchReq dto, bool trackChanges)
        {
            var searchEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<State>(searchEntities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
