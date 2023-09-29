namespace api.Repository.Interfaces
{
    public interface IRepositoryManager
    {
        IUserRepository UserRepository { get; }
        IAccountTypeRepository AccountTypeRepository { get; }
        IAccountRepository AccountRepository { get; }
        void Save();
    }
}
