using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.BAL.Interfaces;

public interface IServiceBase<TEntity, TDto, TDtoRequest>
{
    Task<IList<TDto>> ListAsync(PaginationFilter? filter = null, string? search = "");
    Task<TDto> SingleAsync(int id);
    Task<TDto> CreateAsync(TDtoRequest item);
    Task<TDto> UpdateAsync(int id, TDtoRequest item);
    Task DeleteAsync(int id);
}