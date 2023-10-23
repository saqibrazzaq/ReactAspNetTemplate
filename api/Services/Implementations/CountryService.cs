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
            ValidateForCreate(dto);

            var entity = _mapper.Map<Country>(dto);
            _rep.CountryRepository.Create(entity);
            _rep.Save();
            return _mapper.Map<CountryRes>(entity);
        }

        private void ValidateForCreate(CountryEditReq dto)
        {
            var entityCountryCode = _rep.CountryRepository.FindByCondition(
                x => x.CountryCode == dto.CountryCode,
                false)
                .FirstOrDefault();
            if (entityCountryCode != null)
            {
                throw new Exception(dto.CountryCode + " Country code already exists");
            }

            var entityCountryName = _rep.CountryRepository.FindByCondition(
                x => x.CountryName == dto.CountryName,
                false)
                .FirstOrDefault();
            if (entityCountryName != null)
            {
                throw new Exception(dto.CountryName + " Country Name already exists");
            }
        }

        public void Delete(int countryId)
        {
            ValidateForDelete(countryId);

            var entity = FindCountryIfExists(countryId, true);
            _rep.CountryRepository.Delete(entity);
            _rep.Save();
        }

        private void ValidateForDelete(int countryId)
        {
            var anyStates = _rep.StateRepository.FindByCondition(
                x => x.CountryId == countryId,
                false)
                .Any();
            if (anyStates == true)
            {
                throw new Exception("Cannot delete Country with 1 or more States");
            }
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
            ValidateForUpdate(countryId, dto);

            var entity = FindCountryIfExists(countryId, true);
            _mapper.Map(dto, entity);
            _rep.Save();
            return _mapper.Map<CountryRes>(entity);
        }

        private void ValidateForUpdate(int countryId, CountryEditReq dto)
        {
            var entityCountryCode = _rep.CountryRepository.FindByCondition(
                x => x.CountryCode == dto.CountryCode &&
                x.CountryId != countryId,
                false)
                .FirstOrDefault();
            if (entityCountryCode != null) 
            {
                throw new Exception(dto.CountryCode + " Country Code already exists");
            }

            var entityCountryName = _rep.CountryRepository.FindByCondition(
                x => x.CountryName == dto.CountryName &&
                x.CountryId != countryId,
                false)
                .FirstOrDefault();
            if (entityCountryName != null)
            {
                throw new Exception(dto.CountryName + " Country Name already exists");
            }
        }
    }
}
