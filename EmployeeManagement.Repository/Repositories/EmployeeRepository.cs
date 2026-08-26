using EmployeeManagement.Core.Interfaces;
using EmployeeManagement.Infrastructure.Data;
using EmployeeManagment.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Repository
{
	public class EmployeeRepository : IEmployeeRepository
	{
		private readonly EmployeeDbContext _context;

		public EmployeeRepository(EmployeeDbContext context)
		{
			_context = context;
		}

		public async Task<List<Employee>> GetAllAsync()
		{
			return await _context.Employees
								 .Include(e => e.Department)
								 .ToListAsync();
		}

		public async Task<Employee?> GetByIdAsync(int id)
		{
			return await _context.Employees
								 .Include(e => e.Department)
								 .FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task AddAsync(Employee employee)
		{
			await _context.Employees.AddAsync(employee);
			await _context.SaveChangesAsync();
		}

		public async Task UpdateAsync(Employee employee)
		{
			_context.Employees.Update(employee);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(int id)
		{
			var employee = await _context.Employees.FindAsync(id);

			if (employee != null)
			{
				_context.Employees.Remove(employee);
				await _context.SaveChangesAsync();
			}
		}
	}
}