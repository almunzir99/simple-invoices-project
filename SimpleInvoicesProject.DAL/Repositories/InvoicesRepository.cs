using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SimpleInvoicesProject.DAL.Database;
using SimpleInvoicesProject.DAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;

namespace SimpleInvoicesProject.DAL.Repositories;

public class InvoicesRepository : IRepositoryBase<Invoice>
{
    private readonly AppDbContext _dbContext;

    public InvoicesRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Invoice> Create(Invoice item)
    {
        await _dbContext.Invoices.AddAsync(item);
        return item;
    }

    public async Task Delete(int id)
    {
        var target = await _dbContext.Invoices.FirstOrDefaultAsync(c => c.InvoiceId == id);
        if (target == null)
            throw new Exception("Target invoice isn't available");
        _dbContext.Invoices.Remove(target);
    }

    public async Task<Invoice> Update(int id, Invoice item)
    {
        var target = await _dbContext.Invoices.AsNoTracking()
            .FirstOrDefaultAsync(c => c.InvoiceId == id);
        if (target == null)
            throw new Exception("Target invoice isn't available");
        item.InvoiceId = id;
        target = item;
        _dbContext.Invoices.Update(target);
        return target;
    }

    public async Task<IList<Invoice>> List(Expression<Func<Invoice, bool>>? predicate)
    {
        var list = await _dbContext.Invoices.Where(predicate ?? (c => true)).ToListAsync();
        return list;
    }

    public async Task<Invoice?> Single(int id)
    {
        var target = await _dbContext.Invoices
            .FirstOrDefaultAsync(c => c.InvoiceId == id);
        return target;
    }

    public async Task<int> TotalRecords() => await _dbContext.Invoices.CountAsync();
    public async Task Complete()
    {
        await _dbContext.SaveChangesAsync();
    }
}