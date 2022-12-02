using Microsoft.AspNetCore.Mvc;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.WebApp.Interfaces;

public interface IApiController<TEntity, TDto, in TDtoRequest, TService>
     where TService :IServiceBase<TEntity, TDto, TDtoRequest>
{
    Task<IActionResult> GetAsync(PaginationFilter? filter = null, string title = "");
    Task<IActionResult> SingleAsync(int id);
    Task<IActionResult> PostAsync(TDtoRequest body);
    Task<IActionResult> PutAsync(int id, TDtoRequest body);
    Task<IActionResult> DeleteAsync(int id);
}