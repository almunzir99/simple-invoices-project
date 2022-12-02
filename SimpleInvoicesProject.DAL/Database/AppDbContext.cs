using Microsoft.EntityFrameworkCore;
using SimpleInvoicesProject.DAL.Models;

namespace SimpleInvoicesProject.DAL.Database;

public class AppDbContext : DbContext
{
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Invoice> Invoices => Set<Invoice>();

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
    
}