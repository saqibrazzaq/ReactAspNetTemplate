using api.Dtos.Address;
using api.Dtos.Country;
using api.Dtos.User;
using api.Entities;

namespace api
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            // User
            CreateMap<AppIdentityUser, AuthenticationRes>();
            CreateMap<AppIdentityUser, UserRes>();
            CreateMap<CreateUserReq, AppIdentityUser>();

            // Country
            CreateMap<Country, CountryRes>();
            CreateMap<Country, CountryWithStateCountRes>();
            CreateMap<CountryEditReq, Country>();

            // State
            CreateMap<State, StateRes>();
            CreateMap<StateEditReq, State>();

            // Address
            CreateMap<Address, AddressRes>();
            CreateMap<AddressEditReq, Address>();
            CreateMap<UserAddress, UserAddressRes>();
            CreateMap<UserAddressEditReq, UserAddress>();
        }
    }
}
