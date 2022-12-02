using AutoMapper;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;

namespace SimpleInvoicesProject.BAL.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Customer, CustomerDto>().ReverseMap();
        CreateMap<Customer, CustomerDtoRequest>().ReverseMap();
        CreateMap<Invoice, InvoiceDto>().ReverseMap();
        CreateMap<Invoice, InvoiceDtoRequest>().ReverseMap();
    }
}