using api.Data;
using api.Dtos.Country;
using api.Entities;
using api.Repository.Interfaces;
using api.Utility.Paging;

namespace api.Repository.Implementations
{
    public class CountryRepository : RepositoryBase<Country>, ICountryRepository
    {
        private readonly AppDbContext _db;
        public CountryRepository(AppDbContext context) : base(context)
        {
            _db = context;
        }

        public PagedList<Country> SearchCountries(CountrySearchReq dto, bool trackChanges)
        {
            var countryEntities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Country>(countryEntities, count,
                dto.PageNumber, dto.PageSize);
        }



        public PagedList<CountryWithStateCountRes> SearchCountriesWithStateCount(CountrySearchReq dto, bool trackChanges)
        {
            var countryEntities = GetQuery_CountriesWithStateCount()
                .SearchWithStateCount(dto)
                .SortWithStateCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_CountriesWithStateCount()
                .SearchWithStateCount(dto)
                .Count();
            return new PagedList<CountryWithStateCountRes>(countryEntities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<CountryWithStateCountRes> GetQuery_CountriesWithStateCount()
        {
            var query = from c in _db.Countries
                        select new CountryWithStateCountRes
                        {
                            CountryId = c.CountryId,
                            CountryCode = c.CountryCode,
                            CountryName = c.CountryName,
                            StateCount = c.States != null ? c.States.Count() : 0,
                        };
            return query;
        }
    }
}
