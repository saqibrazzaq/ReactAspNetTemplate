﻿using api.Dtos.Country;
using api.Entities;
using api.Repository.Interfaces;
using api.Services.Interfaces;
using api.Utility.Paging;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations
{
    public class StateService : IStateService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _rep;
        public StateService(IMapper mapper, 
            IRepositoryManager rep)
        {
            _mapper = mapper;
            _rep = rep;
        }

        public StateRes Create(StateEditReq dto)
        {
            ValidateForCreate(dto);

            var entity = _mapper.Map<State>(dto);
            _rep.StateRepository.Create(entity);
            _rep.Save();
            return _mapper.Map<StateRes>(entity);
        }

        private void ValidateForCreate(StateEditReq dto)
        {
            var entityCode = _rep.StateRepository.FindByCondition(
                x => x.StateCode == dto.StateCode,
                false)
                .FirstOrDefault();
            if (entityCode != null)
            {
                throw new Exception(dto.StateCode + " State Code already exists.");
            }

            var entityName = _rep.StateRepository.FindByCondition(
                x => x.StateName == dto.StateName,
                false)
                .FirstOrDefault();
            if (entityName != null)
            {
                throw new Exception(dto.StateName + " State Name already exists");
            }
        }

        public void Delete(int stateId)
        {
            var entity = FindStateIfExists(stateId, true);
            _rep.StateRepository.Delete(entity);
            _rep.Save();
        }

        private State FindStateIfExists(int stateId, bool trackChanges)
        {
            var entity = _rep.StateRepository.FindByCondition(
                x => x.StateId == stateId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No state found with id " + stateId); }

            return entity;
        }

        private State FindStateWithCountryIfExists(int stateId, bool trackChanges)
        {
            var entity = _rep.StateRepository.FindByCondition(
                x => x.StateId == stateId,
                trackChanges,
                include: i => i.Include(x => x.Country))
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No state found with id " + stateId); }

            return entity;
        }

        public StateRes Get(int stateId)
        {
            var entity = FindStateWithCountryIfExists(stateId, false);
            return _mapper.Map<StateRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<StateRes>, MetaData> Search(StateSearchReq dto)
        {
            var pagedEntities = _rep.StateRepository.
                SearchStates(dto, false);
            var dtos = _mapper.Map<IEnumerable<StateRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<StateRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public StateRes Update(int stateId, StateEditReq dto)
        {
            ValidateForUpdate(stateId, dto);

            var entity = FindStateIfExists(stateId, true);
            _mapper.Map(dto, entity);
            _rep.Save();
            return _mapper.Map<StateRes>(entity);
        }

        private void ValidateForUpdate(int stateId, StateEditReq dto)
        {
            var entityCode = _rep.StateRepository.FindByCondition(
                x => x.StateCode == dto.StateCode &&
                x.StateId != stateId,
                false)
                .FirstOrDefault();
            if (entityCode != null)
            {
                throw new Exception(dto.StateCode + " State Code already exists.");
            }

            var entityName = _rep.StateRepository.FindByCondition(
                x => x.StateName == dto.StateName &&
                x.StateId != stateId,
                false)
                .FirstOrDefault();
            if (entityName != null)
            {
                throw new Exception(dto.StateName + " State Name already exists");
            }
        }
    }
}
