using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagment.Core.Entities
{
	public class Employee
	{
		public int Id { get; set; }

		public string FirstName { get; set; } = string.Empty;

		public string LastName { get; set; } = string.Empty;

		public string Email { get; set; } = string.Empty;

		public string PhoneNumber { get; set; } = string.Empty;

		public decimal Salary { get; set; }

		public DateTime JoiningDate { get; set; }

		public bool IsActive { get; set; }

		public int DepartmentId { get; set; }

		public Department? Department { get; set; }
	}
}
