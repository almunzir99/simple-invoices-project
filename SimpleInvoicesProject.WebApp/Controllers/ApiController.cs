using System.Text;
using Microsoft.AspNetCore.Mvc;
using SimpleInvoicesProject.BAL.Helpers;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DTOs.Filters;
using SimpleInvoicesProject.DTOs.Wrappers;
using SimpleInvoicesProject.WebApp.Interfaces;

namespace SimpleInvoicesProject.WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiController<TEntity, TDto, TDtoRequest, TService> : ControllerBase, IApiController<TEntity, TDto, TDtoRequest, TService>
 where TService : IServiceBase<TEntity, TDto, TDtoRequest>
{
    protected readonly TService Service;
    private readonly IUriService _uriService;
    protected ApiController(TService service, IUriService uriService)
    {
        Service = service;
        _uriService = uriService;
    }
    [HttpGet]
    public virtual async Task<IActionResult> GetAsync([FromQuery] PaginationFilter? filter = null, [FromQuery] string? title = "")
    {
        var validFilter = (filter == null)
            ? new PaginationFilter()
            : new PaginationFilter(pageIndex: filter.PageIndex, pageSize: filter.PageSize);
        var result = await Service.ListAsync(filter, title);
        var totalRecords = await Service.TotalRecords();
        if (Request.Path.Value != null)
            return Ok(PaginationHelper.CreatePagedResponse(result,
                validFilter, _uriService, totalRecords, Request.Path.Value));
        var response = new Response<string>(message: "Operation Failed because Request.Path.Value == null");
        return BadRequest(response);
    }
    [HttpGet("{id}")]
    public virtual async Task<IActionResult> SingleAsync(int id)
    {
        try
        {
            var result = await Service.SingleAsync(id);
            var response = new Response<TDto>(data: result);
            return Ok(response);

        }
        catch (Exception e)
        {

            var response = new Response<TDto>(success: false, errors: new List<string>() { e.Message });
            return BadRequest(response);
        }
    }
    [HttpPost]
    public virtual async Task<IActionResult> PostAsync(TDtoRequest body)
    {

        try
        {
            var result = await Service.CreateAsync(body);
            var response = new Response<TDto>(data: result);
            return Ok(response);

        }
        catch (Exception e)
        {

            var response = new Response<TDto>(success: false, errors: new List<string>() { e.Message });
            return BadRequest(response);
        }
    }
    [HttpPut("{id}")]
    public virtual async Task<IActionResult> PutAsync(int id, TDtoRequest body)
    {
        try
        {
            var result = await Service.UpdateAsync(id, body);
            var response = new Response<TDto>(data: result);
            return Ok(response);

        }
        catch (Exception e)
        {
            var response = new Response<TDto>(success: false, errors: new List<string>() { e.Message });
            return BadRequest(response);
        }
    }
    [HttpDelete("{id}")]
    public virtual async Task<IActionResult> DeleteAsync(int id)
    {
        try
        {
            await Service.DeleteAsync(id);
            var response = new Response<TDto>(message: "Item Deleted Successfully");
            return Ok(response);

        }
        catch (Exception e)
        {
            var response = new Response<TDto>(success: false, errors: new List<string>() { e.Message });
            return BadRequest(response);
        }
    }
    
    
}