# Employee Management System (EMS) Portal

A modern Employee Management System with separate interfaces for administrators and employees, built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Employee View](#employee-view)
  - [Admin View](#admin-view)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Data Visualization](#data-visualization)
- [Future Enhancements](#future-enhancements)

## 📝 Overview

The EMS Portal is a comprehensive web application designed to streamline administrative tasks related to workforce management. It provides:

- **Employee Dashboard**: For tracking attendance, viewing salary information, and monitoring personal metrics
- **Admin Dashboard**: For managing employees, viewing organizational metrics, and monitoring department distribution
- **Secure Authentication**: Role-based access with different views for admins and employees
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Data Visualization**: Interactive charts for attendance data and department distribution

## ✨ Features

### Employee Features
- **Dashboard**: Overview of personal attendance, working hours, and upcoming tasks
- **Attendance Tracking**: Monitor daily and monthly attendance metrics
- **Salary Information**: View salary details and payment history
- **Profile Management**: Update personal information and settings

### Admin Features
- **Dashboard**: Organization-wide metrics and KPIs
- **Employee Management**: Add, edit, and manage employee information
- **Department Distribution**: Visual representation of staff distribution across departments
- **Attendance Monitoring**: Track employee attendance and generate reports
- **Settings Management**: Configure system-wide settings

## 📸 Screenshots

### Login Page
![Login Page](/public/images/login.png)
*Modern login interface with email/password authentication and social login options*

### Employee Dashboard
![Employee Dashboard](/public/images/employee-dashboard.png)
*Employee portal showing attendance metrics, weekly activity, and department distribution*

### Admin Dashboard
![Admin Dashboard](/public/images/admin-dashboard.png)
*Admin interface with organization-wide metrics, monthly attendance, and department analytics*

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Context API with custom hooks
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **Data Visualization**: Recharts
- **UI Components**: Custom components built on Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ems-portal.git
   cd ems-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🚀 Usage

### Employee View

Once logged in as an employee, you will have access to:

1. **Dashboard**: View your attendance statistics, upcoming tasks, and weekly activity.
2. **Attendance**: Track your attendance history and view detailed reports.
3. **Salary**: Check your salary information, payment history, and tax details.
4. **Profile**: Update your personal information, contact details, and preferences.

### Admin View

When logged in as an administrator, you will have access to:

1. **Dashboard**: View organization-wide metrics, department distribution, and employee statistics.
2. **Employees**: Manage employee information, search, filter, and perform actions on employee records.
3. **Settings**: Configure system settings, department structures, and role permissions.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components (card, button, etc.)
│   ├── Layout.tsx     # Main application layout
│   ├── Sidebar.tsx    # Navigation sidebar
│   └── Header.tsx     # Application header
├── context/           # React Context providers
│   └── AuthContext.tsx # Authentication context
├── pages/             # Application pages
│   ├── admin/         # Admin-specific pages
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   └── Settings.tsx
│   ├── Dashboard.tsx  # Employee dashboard
│   ├── Attendance.tsx
│   ├── Salary.tsx
│   ├── Profile.tsx
│   └── Login.tsx
├── lib/               # Utility functions and helpers
│   └── utils.ts
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🔐 Authentication

The EMS Portal uses a token-based authentication system with localStorage for persistence. Key features include:

- **Role-based Access Control**: Different views for employees and administrators
- **Protected Routes**: Secure routes that require authentication
- **Session Persistence**: Remembers the user between sessions
- **Automatic Redirect**: Routes users to appropriate dashboards based on their role

## 📊 Data Visualization

The application includes several data visualization components:

- **Bar Charts**: For attendance data and activity tracking
- **Pie Charts**: For department distribution visualization
- **Progress Indicators**: For completion metrics and goals

These are implemented using Recharts, a composable charting library for React.

## 🚀 Future Enhancements

- **Real-time Notifications**: Implement WebSocket for real-time updates
- **Advanced Analytics**: Add predictive analytics for attendance patterns
- **Mobile Application**: Develop companion mobile apps for iOS and Android
- **Leave Management**: Add a comprehensive leave management system
- **Performance Reviews**: Implement performance assessment tools
- **Document Management**: Add document upload and management capabilities 