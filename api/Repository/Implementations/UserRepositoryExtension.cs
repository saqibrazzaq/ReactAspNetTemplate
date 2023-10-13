using api.Dtos.User;
using api.Entities;
using api.Utility.Paging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace api.Repository.Implementations
{
    public static class UserRepositoryExtension
    {
        public static IQueryable<AppIdentityUser> Search(this IQueryable<AppIdentityUser> items,
            SearchUsersRequestDto searchParams)
        {
            var itemsToReturn = items;

            // Must match account id
            itemsToReturn = itemsToReturn.Where(x => x.AccountId == searchParams.AccountId);

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.UserName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        x.Email.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<AppIdentityUser> Sort(this IQueryable<AppIdentityUser> users,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return users.OrderBy(e => e.UserName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<AppIdentityUser>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return users.OrderBy(e => e.UserName);

            return users.OrderBy(orderQuery);
        }
    }
}
