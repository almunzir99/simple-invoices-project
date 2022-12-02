using Microsoft.AspNetCore.WebUtilities;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.WebApp.Implementation;

public class UriService : IUriService
{
    private readonly string _baseUri;

    public UriService(string baseUri)
    {
        _baseUri = baseUri;
    }
    public string GetBaseUri()
    {
        return this._baseUri;
    }
    public Uri GetPageUri(PaginationFilter filter, string route)
    {
        var endPoint = new Uri(String.Concat(_baseUri, route));
        if (endPoint == null) throw new ArgumentNullException(nameof(endPoint));
        var endPointWithParams = QueryHelpers.AddQueryString(endPoint.ToString(), "pageIndex", filter.PageIndex.ToString());
        endPointWithParams = QueryHelpers.AddQueryString(endPointWithParams, "pageSize", filter.PageSize.ToString());
        return new Uri(endPointWithParams);
    }
}