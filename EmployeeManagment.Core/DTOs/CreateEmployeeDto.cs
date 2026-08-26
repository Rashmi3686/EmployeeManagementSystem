using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Core.DTOs;

public class CreateEmployeeDto
{
	[Required]
	[MaxLength(50)]
	public string FirstName { get; set; } = string.Empty;

	[Required]
	[MaxLength(50)]
	public string LastName { get; set; } = string.Empty;

	[Required]
	[EmailAddress]
	public string Email { get; set; } = string.Empty;

	public string PhoneNumber { get; set; } = string.Empty;

	[Range(0, double.MaxValue)]
	public decimal Salary { get; set; }

	public DateTime JoiningDate { get; set; }

	public bool IsActive { get; set; }

	public int DepartmentId { get; set; }
}