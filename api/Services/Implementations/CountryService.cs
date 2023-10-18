using api.Dtos.Country;
using api.Entities;
using api.Repository.Interfaces;
using api.Services.Interfaces;
using api.Utility.Paging;
using AutoMapper;

namespace api.Services.Implementations
{
    public class CountryService : ICountryService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _rep;
        public CountryService(IMapper mapper, 
            IRepositoryManager rep)
        {
            _mapper = mapper;
            _rep = rep;
        }

        public CountryRes Create(CountryEditReq dto)
        {
            var entity = _mapper.Map<Country>(dto);
            _rep.CountryRepository.Create(entity);
            _rep.Save();
            return _mapper.Map<CountryRes>(entity);
        }

        public void Delete(int countryId)
        {
            var entity = FindCountryIfExists(countryId, true);
            _rep.CountryRepository.Delete(entity);
            _rep.Save();
        }

        private Country FindCountryIfExists(int countryId, bool trackChanges)
        {
            var entity = _rep.CountryRepository.FindByCondition(
                x => x.CountryId == countryId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No country found with id " + countryId); }

            return entity;
        }

        public CountryRes Get(int countryId)
        {
            var entity = FindCountryIfExists(countryId, false);
            return _mapper.Map<CountryRes>(entity);
        }

        public CountryWithStateCountRes GetWithStateCount(int countryId)
        {
            var entity = FindCountryWithStateCountIfExists(countryId, false);
            return _mapper.Map<CountryWithStateCountRes>(entity);
        }

        private CountryWithStateCountRes FindCountryWithStateCountIfExists(
            int countryId, bool trackChanges)
        {
            var entity = _rep.CountryRepository.FindByCondition(
                x => x.CountryId == countryId,
                trackChanges)
                .Select(x => new CountryWithStateCountRes
                {
                    CountryId = x.CountryId,
                    CountryCode = x.CountryCode,
                    CountryName = x.CountryName,
                    StateCount = (x.States != null) ? x.States.Count() : 0,
                })
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No country found with id " + countryId); }

            return entity;
        }

        public ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData> Search(CountrySearchReq dto)
        {
            var pagedEntities = _rep.CountryRepository.
                SearchCountries(dto, false);
            var dtos = _mapper.Map<IEnumerable<CountryRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<CountryWithStateCountRes>, MetaData> SearchWithStateCount(CountrySearchReq dto)
        {
            var pagedEntities = _rep.CountryRepository.
                SearchCountriesWithStateCount(dto, false);
            var dtos = _mapper.Map<IEnumerable<CountryWithStateCountRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CountryWithStateCountRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CountryRes Update(int countryId, CountryEditReq dto)
        {
            var entity = FindCountryIfExists(countryId, true);
            _mapper.Map(dto, entity);
            _rep.Save();
            return _mapper.Map<CountryRes>(entity);
        }
    }
}
