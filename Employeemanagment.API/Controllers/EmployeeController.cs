using AutoMapper;
using EmployeeManagement.Core.DTOs;
using EmployeeManagement.Core.Interfaces;
using EmployeeManagement.Services.Interfaces;
using EmployeeManagment.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmployeeController : ControllerBase
	{

		private readonly IEmployeeService _employeeService;

		public EmployeeController(IEmployeeService employeeService)
		{
			_employeeService = employeeService;
		}

		[HttpGet]
		public async Task<IActionResult> GetEmployees()
		{
			var employees = await _employeeService.GetAllAsync();
			return Ok(employees);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetEmployeeById(int id)
		{
			var employee = await _employeeService.GetByIdAsync(id);

			if (employee == null)
				return NotFound();

			return Ok(employee);
		}

		[HttpPost]
		public async Task<IActionResult> CreateEmployee(CreateEmployeeDto dto)
		{
			var employee = await _employeeService.CreateAsync(dto);

			return Ok(employee);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto dto)
		{
			await _employeeService.UpdateAsync(id, dto);

			return Ok("Employee updated successfully.");
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteEmployee(int id)
		{
			await _employeeService.DeleteAsync(id);

			return Ok("Employee deleted successfully.");
		}



	}
}