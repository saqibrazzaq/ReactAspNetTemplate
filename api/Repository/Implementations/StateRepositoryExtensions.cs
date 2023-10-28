using api.Dtos.Country;
using api.Entities;
using api.Utility.Paging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace api.Repository.Implementations
{
    public static class StateRepositoryExtensions
    {
        public static IQueryable<State> Search(this IQueryable<State> items,
            StateSearchReq searchParams)
        {
            // Convert to lower case
            var searchTerm = searchParams?.SearchText?.Trim().ToLower();

            var itemsToReturn = items;
            itemsToReturn = itemsToReturn.Include(x => x.Country);

            // Search in different properties
            if (string.IsNullOrWhiteSpace(searchTerm) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                // Name
                x => (x.StateName ?? "").ToLower().Contains(searchTerm) ||
                (x.StateCode ?? "").ToLower().Contains(searchTerm)
                );
            }

            if (searchParams?.CountryId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CountryId == searchParams.CountryId);
            }

            return itemsToReturn;
        }

        public static IQueryable<State> Sort(this IQueryable<State> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.StateName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<State>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.StateName);

            return items.OrderBy(orderQuery);
        }
    }
}
