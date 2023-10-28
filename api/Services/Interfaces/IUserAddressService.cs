using api.Dtos.Address;

namespace api.Services.Interfaces
{
    public interface IUserAddressService
    {
        Task<UserAddressRes> Create(AddressEditReq dto);
        Task<UserAddressRes> Update(int userAddressId, AddressEditReq dto);
        Task Delete(int userAddressId);
        Task<UserAddressRes> Get(int userAddressId);
        Task<IList<UserAddressRes>> GetAll(bool trackChanges);
    }
}
