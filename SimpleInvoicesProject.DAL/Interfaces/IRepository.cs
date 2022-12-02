using System.Linq.Expressions;

namespace SimpleInvoicesProject.DAL.Interfaces;

public interface IRepositoryBase<T> where  T: class, new()
{
    Task<T> Create(T item);
    Task Delete(int id);
    Task<T> Update(int id,T item);
    Task<IList<T>> List(Expression<Func<T, bool>>? predicate = null);
    Task<T?> Single(int id);
    Task<int> TotalRecords();
    Task Complete();
}