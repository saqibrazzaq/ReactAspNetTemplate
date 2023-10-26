using api.Dtos.Address;

namespace api.Services.Interfaces
{
    public interface IUserAddressService
    {
        UserAddressRes Create(UserAddressEditReq dto);
        Task<UserAddressRes> Update(int userAddressId, UserAddressEditReq dto);
        Task Delete(int userAddressId);
        Task<UserAddressRes> Get(int userAddressId);
        Task<IList<UserAddressRes>> GetAll();
    }
}
