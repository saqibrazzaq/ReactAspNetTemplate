namespace api.Common
{
    public class SecretUtility
    {
        public static string? JwtValidAudience
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.ValidAudience");
            }
        }

        public static string? JwtValidIssuer
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.ValidIssuer");
            }
        }

        public static string? JWTTokenValidityInMinutes
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.TokenValidityInMinutes");
            }
        }

        public static string? JWTRefreshTokenValidityInDays
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.RefreshTokenValidityInDays");
            }
        }

        public static string? JWTEmailVerificationTokenValidityInMinutes
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.EmailVerificationTokenValidityInMinutes");
            }
        }

        public static string? JWTForgotPasswordTokenValidityInDays
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.ForgotPasswordTokenValidityInDays");
            }
        }

        public static string? JWTSecret
        {
            get
            {
                return Environment.GetEnvironmentVariable("JWT.Secret");
            }
        }

        public static string? SqlServer
        {
            get
            {
                return Environment.GetEnvironmentVariable("SQLSERVER");
            }
        }

        public static string? MailJetApiKey
        {
            get
            {
                return Environment.GetEnvironmentVariable("MailJet.ApiKey");
            }
        }

        public static string? MailJetSecretKey
        {
            get
            {
                return Environment.GetEnvironmentVariable("MailJet.SecretKey");
            }
        }

        public static string? MailJetSenderName
        {
            get
            {
                return Environment.GetEnvironmentVariable("MailJet.SenderName");
            }
        }

        public static string? MailJetSenderEmail
        {
            get
            {
                return Environment.GetEnvironmentVariable("MailJet.SenderEmail");
            }
        }

        public static string? CloudinaryUrl
        {
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_URL");
            }
        }

        public static string? CloudinaryFolder
        {
            get
            {
                return Environment.GetEnvironmentVariable("CLOUDINARY_FOLDER");
            }
        }

        public static string? DefaultSuperAdminUsername
        {
            get
            {
                return Environment.GetEnvironmentVariable("DEFAULT_SUPER_ADMIN_USERNAME");
            }
        }

        public static string? DefaultSuperAdminPassword
        {
            get
            {
                return Environment.GetEnvironmentVariable("DEFAULT_SUPER_ADMIN_PASSWORD");
            }
        }

        public static string? DefaultSuperAdminEmailAddress
        {
            get
            {
                return Environment.GetEnvironmentVariable("DEFAULT_SUPER_ADMIN_EMAIL");
            }
        }

        public static string? CorsOrigins
        {
            get
            {
                return Environment.GetEnvironmentVariable("CORS_ORIGINS");
            }
        }
    }
}
