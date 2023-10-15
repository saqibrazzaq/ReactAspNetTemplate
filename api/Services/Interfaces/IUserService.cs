using api.Dtos.User;
using api.Utility.Paging;

namespace api.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginRequestDto dto);
        Task<AuthenticationResponseDto> RegisterOwner(CreateUserRequestDto dto);
        Task CreateUser(CreateUserRequestDto dto);
        Task Delete(DeleteUserRequestDto dto);
        Task<TokenDto> RefreshToken(TokenDto dto);
        Task SendVerificationEmail();
        Task VerifyEmail(VerifyEmailRequestDto dto);
        Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto);
        Task ResetPassword(ResetPasswordRequestDto dto);
        Task ChangePassword(ChangePasswordRequestDto dto);
        Task<ApiOkPagedResponse<IList<UserResponseDto>, MetaData>>
            SearchUsers(SearchUsersRequestDto dto, bool trackChanges);
        Task<AuthenticationResponseDto> GetLoggedInUser();
        Task<UserResponseDto> FindByUsername(string username);
        Task UpdateProfilePicture(IFormFile formFile);
        Task AddRoleToUser(AddRoleRequestDto dto);
        IList<RoleRes> GetAllRoles();
    }
}
