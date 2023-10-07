using api.Dtos.User;
using api.Utility.Paging;

namespace api.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginRequestDto dto);
        Task<AuthenticationResponseDto> RegisterOwner(RegisterRequestDto dto);
        Task RegisterAdmin(RegisterRequestDto dto);
        Task Delete(DeleteUserRequestDto dto);
        Task<TokenDto> RefreshToken(TokenDto dto);
        Task SendVerificationEmail();
        Task VerifyEmail(VerifyEmailRequestDto dto);
        Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto);
        Task ResetPassword(ResetPasswordRequestDto dto);
        Task ChangePassword(ChangePasswordRequestDto dto);
        ApiOkPagedResponse<IEnumerable<UserResponseDto>, MetaData>
            SearchUsers(SearchUsersRequestDto dto, bool trackChanges);
        Task<AuthenticationResponseDto> GetLoggedInUser();
        Task<UserResponseDto> FindByUsername(FindByUsernameRequestDto dto);
        Task UpdateProfilePicture(IFormFile formFile);
    }
}
