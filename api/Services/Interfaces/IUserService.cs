using api.Dtos.User;
using api.Utility.Paging;

namespace api.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginReq dto);
        Task<AuthenticationResponseDto> RegisterOwner(CreateUserReq dto);
        Task CreateUser(CreateUserReq dto);
        Task Delete(DeleteUserReq dto);
        Task<TokenRes> RefreshToken(TokenRes dto);
        Task SendVerificationEmail();
        Task VerifyEmail(VerifyEmailReq dto);
        Task SendForgotPasswordEmail(SendForgotPasswordEmailReq dto);
        Task ResetPassword(ResetPasswordReq dto);
        Task ChangePassword(ChangePasswordReq dto);
        Task<ApiOkPagedResponse<IList<UserRes>, MetaData>>
            SearchUsers(SearchUsersReq dto, bool trackChanges);
        Task<AuthenticationResponseDto> GetLoggedInUser();
        Task<UserRes> FindByUsername(string username);
        Task UpdateProfilePicture(IFormFile formFile);
        Task AddRoleToUser(AddRoleReq dto);
        Task RemoveRoleFromUser(RemoveRoleReq dto);
        IList<RoleRes> GetAllRoles();
    }
}