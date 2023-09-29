using api.Common;
using api.Entities;
using api.Repository.Interfaces;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Identity;

namespace api.Services.Implementations
{
    public class AccountDataSeedService : IAccountDataSeedService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly UserManager<AppIdentityUser> _userManager;

        public AccountDataSeedService(IRepositoryManager repositoryManager, 
            UserManager<AppIdentityUser> userManager)
        {
            _repositoryManager = repositoryManager;
            _userManager = userManager;
        }

        public async void SeedData()
        {
            var entity = _repositoryManager.UserRepository.FindByCondition(
                x => x.UserName == SecretUtility.DefaultSuperAdminUsername &&
                    x.Account.AccountTypeId == (int) AccountTypeNames.Unlimited,
                false).FirstOrDefault();
            if (entity == null)
            {
                // Create new unlimited account
                var unlimitedAccount = new Account
                {
                    AccountTypeId = (int)AccountTypeNames.Unlimited,
                };
                _repositoryManager.AccountRepository.Create(unlimitedAccount);
                _repositoryManager.Save();

                // Create new super admin account
                var superAdminUser = new AppIdentityUser
                {
                    UserName = SecretUtility.DefaultSuperAdminUsername,
                    Email = SecretUtility.DefaultSuperAdminEmailAddress,
                    AccountId = unlimitedAccount.AccountId, // Unlimited account
                };
                var result = await _userManager.CreateAsync(superAdminUser, SecretUtility.DefaultSuperAdminPassword);
                if (result.Succeeded == false) 
                {
                    throw new Exception(result.Errors.FirstOrDefault().Description);
                }

                // Add Role
                var roleResult = await _userManager.AddToRoleAsync(superAdminUser, Constants.SuperAdminRole);
                if (roleResult.Succeeded == false)
                {
                    throw new Exception("Could not add SuperAdmin role to the SuperAdmin user");
                }

                _repositoryManager.Save();
            }
        }
    }
}
