using api.Data;
using api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.Implementations
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IAccountTypeRepository> _accountTypeRepository;
        private readonly Lazy<IAccountRepository> _accountRepository;
        private readonly Lazy<ICountryRepository> _countryRepository;
        private readonly Lazy<IStateRepository> _stateRepository;
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            // Initialize all repositories
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(context));
            _accountTypeRepository = new Lazy<IAccountTypeRepository>(() => new AccountTypeRepository(context));
            _accountRepository = new Lazy<IAccountRepository>(() => new AccountRepository(context));
            _countryRepository = new Lazy<ICountryRepository>(() => new CountryRepository(context));
            _stateRepository = new Lazy<IStateRepository>(() => new StateRepository(context));
        }

        public IUserRepository UserRepository => _userRepository.Value;
        public IAccountTypeRepository AccountTypeRepository => _accountTypeRepository.Value;
        public IAccountRepository AccountRepository => _accountRepository.Value;
        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
