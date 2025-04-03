import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/graphql/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: ''
  };

  error: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  save() {
    console.log('📤 Sending employee to add:', this.employee);

    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('❌ Failed to add employee:', err);
        this.error = 'Failed to add employee. Please try again.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
