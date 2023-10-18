using api.Dtos.Country;
using api.Utility.Paging;

namespace api.Services.Interfaces
{
    public interface ICountryService
    {
        CountryRes Create(CountryEditReq dto);
        CountryRes Update(int countryId, CountryEditReq dto);
        void Delete(int countryId);
        CountryRes Get(int countryId);
        CountryWithStateCountRes GetWithStateCount(int countryId);
        ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData> Search(CountrySearchReq dto);
        ApiOkPagedResponse<IEnumerable<CountryWithStateCountRes>, MetaData> 
            SearchWithStateCount(CountrySearchReq dto);
    }
}
