using api.Dtos.Country;
using api.Entities;
using api.Utility.Paging;

namespace api.Repository.Interfaces
{
    public interface ICountryRepository : IRepositoryBase<Country>
    {
        PagedList<Country> SearchCountries(CountrySearchReq dto, bool trackChanges);
        PagedList<CountryWithStateCountRes> SearchCountriesWithStateCount(CountrySearchReq dto, bool trackChanges);
    }
}
