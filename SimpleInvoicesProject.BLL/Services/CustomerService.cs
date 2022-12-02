using AutoMapper;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;
using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.BAL.Services;

public class CustomersService : ICustomerService
{
    private readonly IRepositoryBase<Customer> _repository;
    private readonly IMapper _mapper;

    public CustomersService(IRepositoryBase<Customer> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IList<CustomerDto>> ListAsync(PaginationFilter? filter, string? search = "")
    {
        if (search == null) search = "";
        var validFilter = (filter == null)
            ? new PaginationFilter()
            : new PaginationFilter(filter.PageIndex, filter.PageSize);
        var list = await _repository.List(c =>
            (c.CustomerName == null) || c.CustomerName.ToLower().Contains(search.ToLower()));
        list = list
            .Skip((validFilter.PageIndex - 1) * validFilter.PageSize)
            .Take(validFilter.PageSize).ToList();
        var result = _mapper.Map<IList<Customer>, IList<CustomerDto>>(list);
        return result;
    }

    public async Task<CustomerDto> SingleAsync(int id)
    {
        var result = await _repository.Single(id);
        var mappedResult = _mapper.Map<CustomerDto>(result);
        return mappedResult;
    }

    public async Task<CustomerDto> CreateAsync(CustomerDtoRequest item)
    {
        var mappedItem = _mapper.Map<Customer>(item);
        var savedItem = await _repository.Create(mappedItem);
        savedItem.CreatedAt = DateTime.Now;
        savedItem.LastUpdate = DateTime.Now;
        await _repository.Complete();
        var result = _mapper.Map<CustomerDto>(savedItem);
        return result;
    }

    public async Task<CustomerDto> UpdateAsync(int id, CustomerDtoRequest item)
    {
        var mappedItem = _mapper.Map<CustomerDtoRequest, Customer>(item);
        var result = await _repository.Update(id, mappedItem);
        await _repository.Complete();
        var mappedResult = _mapper.Map<CustomerDto>(result);
        return mappedResult;
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.Delete(id);
        await _repository.Complete();
    }
    public async Task<int> TotalRecords() => await _repository.TotalRecords();

}