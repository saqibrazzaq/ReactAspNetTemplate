using api.Dtos.Address;
using api.Entities;
using api.Repository.Interfaces;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations
{
    public class UserAddressService : IUserAddressService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _rep;
        private readonly IUserService _userService;
        public UserAddressService(IMapper mapper,
            IRepositoryManager rep,
            IUserService userService)
        {
            _mapper = mapper;
            _rep = rep;
            _userService = userService;
        }

        public async Task<UserAddressRes> Create(AddressEditReq dto)
        {
            var currentUser = await _userService.GetLoggedInUser();
            var userAddressDto = new UserAddressEditReq
            {
                Address = dto,
                UserId = currentUser.Id
            };
            var entity = _mapper.Map<UserAddress>(userAddressDto);

            _rep.UserAddressRepository.Create(entity);
            _rep.Save();
            return _mapper.Map<UserAddressRes>(entity);
        }

        public async Task Delete(int userAddressId)
        {
            var entity = await FindUserAddressIfExists(userAddressId, true);
            _rep.UserAddressRepository.Delete(entity);
            _rep.Save();
        }

        private async Task<UserAddress> FindUserAddressIfExists(int userAddressId, bool trackChanges)
        {
            var currentUser = await _userService.GetLoggedInUser();
            var entity = _rep.UserAddressRepository.FindByCondition(
                x => x.UserAddressId == userAddressId &&
                    x.User.AccountId == currentUser.AccountId,
                trackChanges,
                include: i => i
                    .Include(x => x.Address.State)
                    )
                .FirstOrDefault();
            if (entity == null) throw new Exception("No address found with id" + userAddressId);

            return entity;
        }

        public async Task<UserAddressRes> Get(int userAddressId)
        {
            var entity = await FindUserAddressIfExists(userAddressId, false);
            return _mapper.Map<UserAddressRes>(entity);
        }

        public async Task<IList<UserAddressRes>> GetAll(bool trackChanges)
        {
            var user = await _userService.GetLoggedInUser();
            var entities = _rep.UserAddressRepository.FindByCondition(
                x => x.UserId.ToString() == user.Id,
                trackChanges,
                include: i => i.Include(x => x.Address.State.Country))
                .ToList();
            return _mapper.Map<IList<UserAddressRes>>(entities);
        }

        public async Task<UserAddressRes> Update(int userAddressId, AddressEditReq dto)
        {
            var entity = await FindUserAddressIfExists(userAddressId, true);
            if (dto.IsPrimary) { await MakeOtherAddressesNonPrimary(userAddressId); }
            
            _mapper.Map(dto, entity.Address);
            _rep.Save();
            return _mapper.Map<UserAddressRes>(entity);
        }

        private async Task MakeOtherAddressesNonPrimary(int userAddressId)
        {
            var user = await _userService.GetLoggedInUser();
            var addressIds = _rep.UserAddressRepository.FindByCondition(
                x => x.UserId == user.Id &&
                x.UserAddressId != userAddressId,
                false)
                .Select(x => x.AddressId)
                .ToList();

            var addresses = _rep.AddressRepository.FindByCondition(
                x => addressIds.Contains(x.AddressId),
                true).ToList();
            for (int i = 0; i < addresses.Count(); i++)
            {
                addresses.ElementAt(i).IsPrimary = false;
            }
        }
    }
}
