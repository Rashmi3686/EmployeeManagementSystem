# Employee Management System

A full-stack Employee Management System built using **ASP.NET Core Web API** and **React**. The application provides functionality to manage employee information through a modern web interface and RESTful APIs.

## 🚀 Technologies Used

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- C#
- SQL Server
- Repository Pattern
- Service Layer Architecture

### Frontend
- React
- JavaScript
- HTML
- CSS

## ✨ Features

- Add new employees
- View employee details
- Update employee information
- Delete employees
- Search employees
- Filter employees by department
- RESTful API integration
- Responsive user interface

## 🏗️ Project Architecture

The application follows a layered architecture:

```text
EmployeeManagementSystem
│
├── EmployeeManagement.API
│   └── ASP.NET Core Web API
│
├── EmployeeManagement.Infrastructure
│   └── Database and infrastructure implementation
│
├── EmployeeManagement.Repository
│   └── Data access and repository layer
│
├── EmployeeManagement.Services
│   └── Business logic and services
│
├── EmployeeManagment.Core
│   └── Core entities and models
│
└── EmployeeManagement.React
    └── React frontend application
