const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/employee');
require('dotenv').config();

const resolvers = {
    Query: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error("User not found. Please check your email or sign up.");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Incorrect password. Please try again.");

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return { token, user };
        },

        getAllEmployees: async () => {
            const employees = await Employee.find();
            if (employees.length === 0) throw new Error("No employees found.");
            return employees;
        },

        searchEmployeeByEid: async (_, { id }) => {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid Employee ID format.");

            const employee = await Employee.findById(id);
            if (!employee) throw new Error("No employee found with the given ID.");
            return employee;
        },

        searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
            const employees = await Employee.find({
                $or: [
                    { designation: { $regex: designation, $options: "i" } },
                    { department: { $regex: department, $options: "i" } }
                ]
            });

            if (employees.length === 0) throw new Error("No employees found matching the given designation or department.");
            return employees;
        }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            if (await User.findOne({ username })) {
                throw new Error("Username is already taken. Please choose another one.");
            }
            if (await User.findOne({ email })) {
                throw new Error("An account with this email already exists. Please log in.");
            }

            const user = new User({ username, email, password });
            await user.save();

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return { token, user };
        },

        addEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department }) => {
            try {
                if (!first_name || !last_name || !email || !gender || !designation || !salary || !date_of_joining || !department) {
                    throw new Error("All employee fields are required.");
                }

                if (await Employee.findOne({ email })) {
                    throw new Error("An employee with this email already exists.");
                }

                const newEmployee = new Employee({
                    first_name,
                    last_name,
                    email,
                    gender,
                    designation,
                    salary,
                    date_of_joining,
                    department
                });

                await newEmployee.save();
                return newEmployee;
            } catch (error) {
                throw new Error(error.message || "Failed to add employee. Please check the input data.");
            }
        },

        updateEmployee: async (_, args) => {
            const { id, ...fieldsToUpdate } = args;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error("Invalid Employee ID format.");
            }

            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                { $set: fieldsToUpdate },
                { new: true }
            );

            if (!updatedEmployee) {
                throw new Error("No employee found with the given ID.");
            }

            return updatedEmployee;
        },

        deleteEmployee: async (_, { id }) => {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid Employee ID format.");

            const deletedEmployee = await Employee.findByIdAndDelete(id);
            if (!deletedEmployee) throw new Error("No employee found with the given ID.");

            return `Employee with ID ${id} has been successfully deleted.`;
        }
    }
};

module.exports = resolvers;
