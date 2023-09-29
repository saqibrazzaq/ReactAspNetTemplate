using api.Entities;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Identity;

namespace api.Services.Implementations
{
    public class RoleDataSeedService : IRoleDataSeedService
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleDataSeedService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async void SeedData()
        {
            var roleNames = Constants.AllRoles.Split(",");
            foreach (var roleName in roleNames)
            {
                var findResult = await _roleManager.FindByNameAsync(roleName);
                if (findResult == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}
