using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.BAL.Interfaces;


public interface IUriService
{
    Uri GetPageUri(PaginationFilter filter, string route);
    string GetBaseUri();
}