import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/graphql/employee.service';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeId: string | null = null;

  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    department: '',
    designation: '',
    salary: 0
  };

  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (res: any) => {
          this.employee = res.data.searchEmployeeByEid;
        },
        error: (err) => {
          this.error = 'Failed to fetch employee details.';
        }
      });
    }
  }

  updateEmployee() {
    if (!this.employeeId) return;
    this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.error = 'Failed to update employee.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
