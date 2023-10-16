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
        }
    }
}
