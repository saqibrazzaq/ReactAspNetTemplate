using api.Common;
using api.Dtos.User;
using api.Entities;
using api.Mailer;
using api.Models.Exceptions;
using api.Repository.Interfaces;
using api.Services.Interfaces;
using api.Storage;
using api.Utility;
using api.Utility.Paging;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace api.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IWebHostEnvironment _environment;
        private readonly ICloudinaryService _cloudinaryService;

        public UserService(UserManager<AppIdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IEmailSender emailSender,
            IRepositoryManager repository,
            IMapper mapper,
            IHttpContextAccessor contextAccessor,
            IWebHostEnvironment environment,
            ICloudinaryService cloudinaryService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailSender = emailSender;
            _repository = repository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _environment = environment;
            _cloudinaryService = cloudinaryService;
        }
        public async Task ChangePassword(ChangePasswordRequestDto dto)
        {
            // Verify email address
            var userEntity = await _userManager.FindByEmailAsync(dto.Email);
            if (userEntity == null)
                throw new NotFoundException("No email address found " + dto.Email);

            // Reset password
            var result = await _userManager.ChangePasswordAsync(
                userEntity, dto.CurrentPassword, dto.NewPassword);

            if (result.Succeeded == false)
            {
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    result, nameof(ChangePassword)));
            }
        }

        private string GetFirstErrorFromIdentityResult(IdentityResult result, string methodName)
        {
            var firstError = result.Errors.FirstOrDefault();
            if (firstError != null)
                return firstError.Description;
            else
                return methodName + " method failed";
        }

        public async Task Delete(DeleteUserRequestDto dto)
        {
            var userEntity = await _userManager.FindByNameAsync(dto.Username);
            if (userEntity == null)
                throw new NotFoundException("User does not exist");

            var roles = await _userManager.GetRolesAsync(userEntity);
            if (roles.Contains(Constants.OwnerRole))
                throw new BadRequestException("Owner user cannot be deleted");
            if (roles.Contains(Constants.SuperAdminRole))
                throw new BadRequestException("Super Admin user cannot be deleted");

            var resultUser = await _userManager.DeleteAsync(userEntity);
            if (resultUser.Succeeded == false)
            {
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    resultUser, nameof(Delete)));
            }
        }

        public async Task<AuthenticationResponseDto> GetLoggedInUser()
        {
            //_userManager.Get
            var userEntity = await _userManager.FindByNameAsync(UserName);
            if (userEntity == null)
                throw new NotFoundException("User not found");

            var userDto = _mapper.Map<AuthenticationResponseDto>(userEntity);
            userDto.Roles = await _userManager.GetRolesAsync(userEntity);
            return userDto;
        }

        private string? UserName
        {
            get
            {
                if (_contextAccessor.HttpContext != null &&
                    _contextAccessor.HttpContext.User.Identity != null &&
                    string.IsNullOrWhiteSpace(_contextAccessor.HttpContext.User.Identity.Name) == false)
                    return _contextAccessor.HttpContext.User.Identity.Name;
                else
                    throw new UnauthorizedAccessException("User not logged in");
            }
        }

        public async Task<UserResponseDto> FindByUsername(string username)
        {
            // Find the user
            var userEntity = await _userManager.FindByNameAsync(username);
            // Find current user
            var currentUserEntity = await _userManager.FindByNameAsync(UserName);
            ValidateUserAccount(currentUserEntity, userEntity);

            var userDto = _mapper.Map<UserResponseDto>(userEntity);
            userDto.Roles = await _userManager.GetRolesAsync(userEntity);
            return userDto;
        }

        public async Task<AuthenticationResponseDto> Login(LoginRequestDto dto)
        {
            // Authenticate user
            var userEntity = await AuthenticateUser(dto.Email, dto.Password);

            // If user/pwd are correct
            if (userEntity != null)
            {
                // Create response with access token
                var authRes = new AuthenticationResponseDto
                {
                    Email = userEntity.Email,
                    Roles = await _userManager.GetRolesAsync(userEntity),
                    EmailConfirmed = userEntity.EmailConfirmed,
                    AccountId = userEntity.AccountId,
                    Id = userEntity.Id,
                    FullName = userEntity.FullName,
                    UserName = userEntity.UserName,
                    ProfilePictureUrl = userEntity.ProfilePictureUrl,
                };

                // Generate access/refresh tokens
                authRes.RefreshToken = GenerateRefreshToken();
                authRes.AccessToken = await GenerateAccessToken(userEntity);
                // Update user
                userEntity.RefreshToken = authRes.RefreshToken;
                userEntity.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(
                    int.Parse(SecretUtility.JWTRefreshTokenValidityInMinutes));
                await _userManager.UpdateAsync(userEntity);

                return authRes;
            }
            else throw new UnAuthorizedUserException("Incorrect username/password");
        }

        private async Task<string> GenerateAccessToken(AppIdentityUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    //new Claim("userName", user.UserName),
                    //new Claim("email", user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //new Claim("id", user.Id.ToString()),
                };

            string roles = "";
            foreach (var userRole in userRoles)
            {
                roles += userRole + ",";
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            authClaims.Add(new Claim("roles", roles));

            var token = CreateToken(authClaims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretUtility.JWTSecret));
            _ = int.TryParse(SecretUtility.JWTTokenValidityInMinutes, out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: SecretUtility.JwtValidIssuer,
                audience: SecretUtility.JwtValidAudience,
                expires: DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<AppIdentityUser?> AuthenticateUser(string? email, string? password)
        {
            // Find user
            var userEntity = await _userManager.FindByEmailAsync(email);
            if (userEntity == null)
                return null;

            // Check password
            var isAuthenticated = await _userManager.CheckPasswordAsync(userEntity, password);

            return isAuthenticated ? userEntity : null;
        }

        public async Task<TokenDto> RefreshToken(TokenDto dto)
        {
            var principal = GetPrincipalFromExpiredToken(dto.AccessToken);
            if (principal == null || principal.Identity == null)
                throw new BadRequestException("Invalid access token");

            string? username = principal.Identity.Name;

            var userEntity = await _userManager.FindByNameAsync(username);

            if (userEntity == null || userEntity.RefreshToken != dto.RefreshToken
                || userEntity.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new BadRequestException("Invalid refresh token");
            }

            //var newAccessToken = CreateToken(principal.Claims.ToList());
            var newAccessToken = await GenerateAccessToken(userEntity);
            //var newRefreshToken = GenerateRefreshToken();

            // Update user repository
            //userEntity.RefreshToken = newRefreshToken;
            //userEntity.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(
            //       int.Parse(SecretUtility.JWTRefreshTokenValidityInDays));
            //var userResult = await _userManager.UpdateAsync(userEntity);
            //if (userResult.Succeeded == false)
            //    throw new BadRequestException("Invalid token");

            return new TokenDto
            {
                //AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                AccessToken = newAccessToken,
                //RefreshToken = dto.RefreshToken,
            };
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = SecretUtility.JwtValidIssuer,
                ValidAudience = SecretUtility.JwtValidAudience,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretUtility.JWTSecret)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(
                    SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }

        public async Task<AuthenticationResponseDto> RegisterOwner(CreateUserRequestDto dto)
        {
            await CheckExistingEmailAndUsername(dto.Email, dto.Username);

            // Create account
            var freeAccount = new Account { AccountTypeId = (int)AccountTypeNames.Free };
            _repository.AccountRepository.Create(freeAccount);
            _repository.Save();

            // Create the user
            var userEntity = new AppIdentityUser
            {
                UserName = dto.Username,
                Email = dto.Email,
                AccountId = freeAccount.AccountId
            };
            var result = await _userManager.CreateAsync(userEntity, dto.Password);

            if (result.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    result, nameof(RegisterOwner)));

            // Add this user in Owner role
            var roleResult = await _userManager.AddToRoleAsync(
                userEntity, Constants.OwnerRole);
            if (roleResult.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    roleResult, nameof(RegisterOwner)));

            await SendVerificationEmailToUser(userEntity);

            return await Login(new LoginRequestDto { Email = dto.Email, Password = dto.Password });
        }

        private async Task SendVerificationEmailToUser(AppIdentityUser userEntity)
        {
            // Check if email is already verified
            if (userEntity.EmailConfirmed == true)
                throw new BadRequestException("Email address already verified");

            // Create a token
            var pinCode = GeneratePinCode();
            var minutes = int.Parse(SecretUtility.JWTEmailVerificationTokenValidityInMinutes);

            // Update email verification token in repository
            userEntity.EmailVerificationToken = pinCode;
            userEntity.EmailVerificationTokenExpiryTime = DateTime.UtcNow.AddMinutes(minutes);
            await _userManager.UpdateAsync(userEntity);

            var emailVerificationText = GeneratePinCodeVerificationText(pinCode, minutes);
            _emailSender.SendEmail(userEntity.Email, "Email Verification",
                emailVerificationText);
        }

        private string GeneratePinCodeVerificationText(string pinCode, int minutes)
        {
            string text = $"Pin Code to verify your email address" +
                $"<br />{pinCode}<br />" +
                $"This pin code will expire in {minutes} minutes.";
            return text;
        }

        private static string GeneratePinCode()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max).ToString();
        }

        private async Task CheckExistingEmailAndUsername(string email, string username)
        {
            // Email and username must not already exist
            if ((await checkIfEmailAlreadyExists(email)) == true)
                throw new BadRequestException($"Email {email} is already registered. Use Forgot password if you own this account.");
            if ((await checkIfUsernameAlreadyTaken(username)) == true)
                throw new BadRequestException($"Username {username} is already taken.");
        }

        private async Task<bool> checkIfEmailAlreadyExists(string? email)
        {
            var userEntity = await _userManager.FindByEmailAsync(email);
            // If email already exists, return true
            return userEntity != null ? true : false;
        }

        private async Task<bool> checkIfUsernameAlreadyTaken(string? username)
        {
            var userEntity = await _userManager.FindByNameAsync(username);
            // If username found, return true
            return userEntity != null ? true : false;
        }

        public async Task CreateUser(CreateUserRequestDto dto)
        {
            await CheckExistingEmailAndUsername(dto.Email, dto.Username);
            var currentUserEntity = await _userManager.FindByNameAsync(UserName);

            // Create new user
            var userEntity = new AppIdentityUser
            {
                UserName = dto.Username,
                Email = dto.Email,
                AccountId = currentUserEntity.AccountId,
                FullName = dto.FullName,
            };
            var resultUser = await _userManager.CreateAsync(userEntity, dto.Password);

            if (resultUser.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    resultUser, nameof(CreateUser)));

            // Assign default role
            var roleResult = await _userManager.AddToRoleAsync(userEntity, Constants.UserRole);
            if (roleResult.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    roleResult, nameof(CreateUser)));

            await SendVerificationEmailToUser(userEntity);
        }

        public async Task ResetPassword(ResetPasswordRequestDto dto)
        {
            // Verify email address
            var userEntity = await _userManager.FindByEmailAsync(dto.Email);
            if (userEntity == null)
                throw new NotFoundException("Email address not found.");

            // Update password
            var result = await _userManager.ResetPasswordAsync(
                userEntity, dto.ForgotPasswordToken, dto.Password);

            if (result.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    result, nameof(ResetPassword)));
        }

        public async Task<ApiOkPagedResponse<IList<UserResponseDto>, MetaData>> SearchUsers(
            SearchUsersRequestDto dto, bool trackChanges)
        {
            var userEntity = await _userManager.FindByNameAsync(UserName ?? "");
            dto.AccountId = userEntity?.AccountId ?? 0;

            var usersWithMetadata = _repository.UserRepository.SearchUsers(
                dto, trackChanges);
            var usersDto = _mapper.Map<IList<UserResponseDto>>(usersWithMetadata);
            for (int i = 0; i < usersDto.Count; i++)
            {
                AppIdentityUser user = await _userManager.FindByNameAsync(usersDto[i].UserName);
                usersDto[i].Roles = await _userManager.GetRolesAsync(user);
            }
            return new ApiOkPagedResponse<IList<UserResponseDto>, MetaData>(
                usersDto, usersWithMetadata.MetaData);
        }

        public async Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto)
        {
            // Verify email address
            var userEntity = await _userManager.FindByEmailAsync(dto.Email);
            if (userEntity == null)
                throw new NotFoundException("Email address not found.");

            // Create a token
            var forgotPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(
                userEntity);
            // Generate forgot password email text
            string emailText = GenerateForgotPasswordEmailText(
                forgotPasswordToken);
            _emailSender.SendEmail(userEntity.Email,
                "Reset your password", emailText);
        }

        private string GenerateForgotPasswordEmailText(
            string token)
        {
            string emailText = $"Please use the token below for password reset. <br />" +
                $"{token} <br />";
            return emailText;
        }

        public async Task SendVerificationEmail()
        {
            // Verify email address
            var userEntity = await _userManager.FindByNameAsync(UserName);
            if (userEntity == null)
                throw new NotFoundException("User not found.");

            await SendVerificationEmailToUser(userEntity);
        }

        public async Task UpdateProfilePicture(IFormFile file)
        {
            var uploadResult = _cloudinaryService.UploadProfilePictureThumbnail(file, TempFolderPath);
            await updateProfilePictureInRepository(uploadResult);
        }

        private async Task updateProfilePictureInRepository(CloudinaryUploadResultRes uploadResult)
        {
            var userEntity = await _userManager.FindByNameAsync(UserName);
            //DeleteExistingProfilePictureFromCloudinary(userEntity.ProfilePictureCloudinaryId);
            _cloudinaryService.DeleteImage(userEntity.ProfilePictureCloudinaryId);
            userEntity.ProfilePictureUrl = uploadResult.SecureUrl;
            userEntity.ProfilePictureCloudinaryId = uploadResult.PublicId;
            await _userManager.UpdateAsync(userEntity);
        }

        public string TempFolderPath
        {
            get
            {
                return Path.Combine(_environment.WebRootPath, Constants.TempFolderName);
            }
        }

        public async Task VerifyEmail(VerifyEmailRequestDto dto)
        {
            // Verify email address
            var userEntity = await _userManager.FindByNameAsync(UserName);
            if (userEntity == null)
                throw new NotFoundException("Email address not found.");

            // Check if email is already verified
            if (userEntity.EmailConfirmed == true)
                throw new BadRequestException("Email address already verified");

            // Check verification token expiry
            if (userEntity.EmailVerificationTokenExpiryTime == null ||
                userEntity.EmailVerificationTokenExpiryTime < DateTime.UtcNow)
                throw new BadRequestException("Pin Code expired");

            // Check pin code
            if (string.IsNullOrWhiteSpace(userEntity.EmailVerificationToken) == false &&
                userEntity.EmailVerificationToken.Equals(dto.PinCode) == false)
                throw new BadRequestException("Incorrect pin code");

            // All checks complete, Verify email address
            userEntity.EmailConfirmed = true;
            userEntity.EmailVerificationToken = null;
            userEntity.EmailVerificationTokenExpiryTime = null;
            await _userManager.UpdateAsync(userEntity);
        }

        public async Task AddRoleToUser(AddRoleRequestDto dto)
        {
            if (canAddRole(dto.RoleName) == false)
                throw new Exception("Cannot add Role " + dto.RoleName + " to user.");
            var currentUserEntity = await _userManager.FindByNameAsync(UserName);
            var userEntity = await _userManager.FindByNameAsync(dto.UserName);
            ValidateUserAccount(currentUserEntity, userEntity);

            var result = await _userManager.AddToRoleAsync(userEntity, dto.RoleName);
            if (result.Succeeded == false)
                throw new Exception(result.Errors.FirstOrDefault().Description);
        }

        private void ValidateUserAccount(AppIdentityUser? currentUserEntity, AppIdentityUser? userEntity)
        {
            if (userEntity == null)
                throw new Exception("User not found");
            if (currentUserEntity == null)
                throw new Exception("User not found");
            if (userEntity.AccountId != currentUserEntity.AccountId)
                throw new Exception("User does not belong to this account.");
        }

        private bool canAddRole(string? roleName)
        {
            var roles = Constants.AssignableRoles.Split(',');
            var found = roles.Where(x => x ==  roleName).FirstOrDefault();
            if (found == null)
                return false;
            else
                return true;
        }

        public IList<RoleRes> GetAllRoles()
        {
            var roles = Constants.AssignableRoles.Split(',');
            var list = roles.Select(x => new RoleRes { RoleName = x }).ToList();
            return list;
        }
    }
}
