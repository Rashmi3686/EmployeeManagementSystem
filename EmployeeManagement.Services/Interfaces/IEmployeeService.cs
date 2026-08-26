using EmployeeManagement.Core.DTOs;

namespace EmployeeManagement.Services.Interfaces
{
	public interface IEmployeeService
	{
		Task<IEnumerable<EmployeeDto>> GetAllAsync();

		Task<EmployeeDto?> GetByIdAsync(int id);

		Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto);

		Task UpdateAsync(int id, UpdateEmployeeDto dto);

		Task DeleteAsync(int id);
	}
}