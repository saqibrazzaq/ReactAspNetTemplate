using api.Common;
using Mailjet.Client.TransactionalEmails;
using Mailjet.Client;
using Mailjet.Client.Resources;

namespace api.Mailer
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmail(string email, string subject, string htmlMessage)
        {
            MailjetClient client = new MailjetClient(SecretUtility.MailJetApiKey,
                SecretUtility.MailJetSecretKey);
            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource
            };

            // Create email
            var emailBuilder = new TransactionalEmailBuilder()
                .WithFrom(new SendContact(SecretUtility.MailJetSenderEmail,
                    SecretUtility.MailJetSenderName))
                .WithSubject(subject)
                .WithHtmlPart(htmlMessage)
                .WithTo(new SendContact(email))
                .Build();

            // Send email
            var res = await client.SendTransactionalEmailAsync(emailBuilder);
            if (res.Messages != null && res.Messages.Count() == 0)
            {
                throw new Exception("No response from email server.");
            }
            var result = res.Messages[0];
            if (result != null && result.Errors != null && result.Errors.Count() > 0)
            {
                throw new Exception(result.Errors[0].ErrorMessage);
            }
        }
    }
}
