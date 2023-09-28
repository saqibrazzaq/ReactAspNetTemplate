namespace api.Utility
{
    public class Constants
    {
        public const string SuperAdminRole = "SuperAdmin";
        public const string OwnerRole = "Owner";
        public const string AdminRole = "Admin";
        public const string ManagerRole = "Manager";
        public const string UserRole = "User";

        // For controller attributes
        public const string AllRoles = OwnerRole + "," + AdminRole + "," + ManagerRole + "," + UserRole;
        public const string AllAdminRoles = OwnerRole + "," + AdminRole;

        public const string RefreshTokenCookieName = "refreshToken";

        public const string TempFolderName = "temp";
    }
}
