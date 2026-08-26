using AutoMapper;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Interfaces;
using EmployeeManagement.Services.Interfaces;
using EmployeeManagment.Core.Entities;

namespace EmployeeManagement.Services.Services
{
	public class EmployeeService : IEmployeeService
	{
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IMapper _mapper;

		public EmployeeService(
			IEmployeeRepository employeeRepository,
			IMapper mapper)
		{
			_employeeRepository = employeeRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
		{
			var employees = await _employeeRepository.GetAllAsync();

			return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
		}

		public async Task<EmployeeDto?> GetByIdAsync(int id)
		{
			var employee = await _employeeRepository.GetByIdAsync(id);

			if (employee == null)
				return null;

			return _mapper.Map<EmployeeDto>(employee);
		}

		public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
		{
			var employee = _mapper.Map<Employee>(dto);

			await _employeeRepository.AddAsync(employee);

			return _mapper.Map<EmployeeDto>(employee);
		}

		public async Task UpdateAsync(int id, UpdateEmployeeDto dto)
		{
			var employee = await _employeeRepository.GetByIdAsync(id);

			if (employee == null)
				throw new Exception("Employee not found.");

			_mapper.Map(dto, employee);

			await _employeeRepository.UpdateAsync(employee);
		}

		public async Task DeleteAsync(int id)
		{
			var employee = await _employeeRepository.GetByIdAsync(id);

			if (employee == null)
				throw new Exception("Employee not found.");

			await _employeeRepository.DeleteAsync(id);
		}
	}
}