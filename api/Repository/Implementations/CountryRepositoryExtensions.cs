using api.Dtos.Country;
using api.Entities;
using api.Utility.Paging;
using System.Linq.Dynamic.Core;

namespace api.Repository.Implementations
{
    public static class CountryRepositoryExtensions
    {
        public static IQueryable<Country> Search(this IQueryable<Country> items,
            CountrySearchReq searchParams)
        {
            var itemsToReturn = items;

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.CountryName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.CountryCode ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<Country> Sort(this IQueryable<Country> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.CountryName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Country>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.CountryName);

            return items.OrderBy(orderQuery);
        }

        public static IQueryable<CountryWithStateCountRes> SearchWithStateCount(
            this IQueryable<CountryWithStateCountRes> items,
            CountrySearchReq searchParams)
        {
            var itemsToReturn = items;

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => (x.CountryName ?? "").ToLower().Contains(searchParams.SearchText) ||
                        (x.CountryCode ?? "").ToLower().Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<CountryWithStateCountRes> SortWithStateCount(
            this IQueryable<CountryWithStateCountRes> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.CountryName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<CountryWithStateCountRes>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.CountryName);

            return items.OrderBy(orderQuery);
        }
    }
}
