using Microsoft.AspNetCore.Mvc;
using SimpleInvoicesProject.BAL.Helpers;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;
using SimpleInvoicesProject.DTOs.Filters;
using SimpleInvoicesProject.DTOs.Wrappers;

namespace SimpleInvoicesProject.WebApp.Controllers;

public class CustomersController : ApiController<Customer, CustomerDto, CustomerDtoRequest, ICustomerService>
{
    public CustomersController(ICustomerService service, IUriService uriService) : base(service, uriService)
    {
    }
    [HttpGet("{customerId}/invoices")]
    public virtual async Task<IActionResult> GetInvoicesAsync(int customerId,
        [FromQuery] PaginationFilter? filter = null, [FromQuery] string? title = "")
    {
        var validFilter = (filter == null)
            ? new PaginationFilter()
            : new PaginationFilter(pageIndex: filter.PageIndex, pageSize: filter.PageSize);
        var result = await Service.CustomerInvoicesListAsync(customerId,filter, title);
        var totalRecords = await Service.TotalRecords();
        if (Request.Path.Value != null)
            return Ok(PaginationHelper.CreatePagedResponse(result,
                validFilter, UriService, totalRecords, Request.Path.Value));
        var response = new Response<string>(message: "Operation Failed because Request.Path.Value == null");
        return BadRequest(response);
    }

}