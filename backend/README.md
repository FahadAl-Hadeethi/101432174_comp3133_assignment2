Employee Management System (GraphQL API)
COMP3133 - Assignment 1
Student Name: Fahad Al-Hadeethi
Student ID: 101432174

Project Description
This project implements a GraphQL API for an Employee Management System using Node.js, Express, MongoDB (Mongoose ODM), and Apollo Server. The system allows user authentication and employee management functionalities, including signup, login, CRUD operations for employees, and error handling.

Technologies Used
Node.js & Express.js - Server-side framework
GraphQL & Apollo Server - API query language and server implementation
MongoDB & Mongoose - Database and ODM
JWT (JSON Web Tokens) - Authentication
bcryptjs - Password hashing
dotenv - Environment variable management
Features Implemented
Authentication
✔️ User Signup: Users can register by providing a unique username, email, and password.
✔️ User Login: Registered users can log in and receive a JWT token for authentication.

Employee Management
✔️ Add Employee - Allows the creation of new employees.
✔️ Get All Employees - Fetches all employees from the database.
✔️ Search Employee by ID - Finds an employee using their unique ID.
✔️ Search Employee by Designation or Department - Retrieves employees based on their job role or department.
✔️ Update Employee Details - Allows modifying employee salary, designation, and department.
✔️ Delete Employee - Removes an employee from the database.

Error Handling
✔️ Signup Validation - Prevents duplicate usernames.
✔️ Login Validation - Ensures correct password and registered email.
✔️ Invalid Input Handling - Detects and reports missing fields.
✔️ Invalid Employee ID Handling - Checks for incorrect or non-existent IDs in search, update, and delete operations.