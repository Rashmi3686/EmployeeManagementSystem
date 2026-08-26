
using EmployeeManagment.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Infrastructure.Data
{
	public class EmployeeDbContext : DbContext
	{
		public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
			: base(options)
		{

		}

		public DbSet<Employee> Employees { get; set; }

		public DbSet<Department> Departments { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Employee>()
				.Property(e => e.Salary)
				.HasPrecision(18, 2);

			base.OnModelCreating(modelBuilder);
		}
	}
}