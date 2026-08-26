using AutoMapper;
using EmployeeManagement.Core.DTOs;
using EmployeeManagment.Core.Entities;

namespace EmployeeManagment.Core.Mappings;

public class EmployeeProfile : Profile
{
	public EmployeeProfile()
	{
		// DTO -> Entity
		CreateMap<CreateEmployeeDto, Employee>();

		CreateMap<UpdateEmployeeDto, Employee>();

		CreateMap<Employee, EmployeeDto>()
		.ForMember(dest => dest.FullName,
			opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
		.ForMember(dest => dest.DepartmentName,
			opt => opt.MapFrom(src => src.Department.Name));
	}
}