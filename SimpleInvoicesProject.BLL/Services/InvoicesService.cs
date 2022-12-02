using AutoMapper;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;
using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.BAL.Services;

public class InvoicesService : IInvoicesService
{
    private readonly IRepositoryBase<Invoice> _repository;
    private readonly IMapper _mapper;

    public InvoicesService(IRepositoryBase<Invoice> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IList<InvoiceDto>> ListAsync(PaginationFilter? filter, string? search = "")
    {
        if (search == null) search = "";
        var validFilter = (filter == null)
            ? new PaginationFilter()
            : new PaginationFilter(filter.PageIndex, filter.PageSize);
        var list = await _repository.List(c => c.InvoiceId.ToString() == search);
        list = list
            .Skip((validFilter.PageIndex - 1) * validFilter.PageSize)
            .Take(validFilter.PageSize).ToList();
        var result = _mapper.Map<IList<Invoice>, IList<InvoiceDto>>(list);
        return result;
    }

    public async Task<InvoiceDto> SingleAsync(int id)
    {
        var result = await _repository.Single(id);
        var mappedResult = _mapper.Map<InvoiceDto>(result);
        return mappedResult;
    }
    public async Task<InvoiceDto> CreateAsync(InvoiceDtoRequest item)
    {
        var mappedItem = _mapper.Map<Invoice>(item);
        var savedItem = await _repository.Create(mappedItem);
        await _repository.Complete();
        var result = _mapper.Map<InvoiceDto>(savedItem);
        return result;
    }

    public async Task<InvoiceDto> UpdateAsync(int id, InvoiceDtoRequest item)
    {
        var mappedItem = _mapper.Map<InvoiceDtoRequest, Invoice>(item);
        var result = await _repository.Update(id, mappedItem);
        await _repository.Complete();
        var mappedResult = _mapper.Map<InvoiceDto>(result);
        return mappedResult;
    }

    public async Task<int> TotalRecords() => await _repository.TotalRecords();
    public async Task DeleteAsync(int id)
    {
        await _repository.Delete(id);
        await _repository.Complete();
    }
    
    
}