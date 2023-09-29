using api.Services.Interfaces;

namespace api.Services.Implementations
{
    public class DataSeedService : IDataSeedService
    {
        private readonly IAccountTypeDataSeedService _accountTypeSeedService;
        private readonly IRoleDataSeedService _roleDataSeedService;
        private readonly IAccountDataSeedService _accountDataSeedService;

        public DataSeedService(IAccountTypeDataSeedService accountTypeSeedService,
            IRoleDataSeedService roleDataSeedService,
            IAccountDataSeedService accountDataSeedService)
        {
            _accountTypeSeedService = accountTypeSeedService;
            _roleDataSeedService = roleDataSeedService;
            _accountDataSeedService = accountDataSeedService;
        }

        public void SeedData()
        {
            // Sequence is necessary
            // Create account types e.g. unlimited, free, basic
            _accountTypeSeedService.SeedData();
            // Create roles e.g. admin, manager, user
            _roleDataSeedService.SeedData();
            // Create super admin user with unlimited account
            _accountDataSeedService.SeedData();
        }
    }
}
