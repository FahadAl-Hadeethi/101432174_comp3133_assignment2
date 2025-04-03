import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employees/employee-details/employee-details.component';
import { EmployeeUpdateComponent } from './components/employees/employee-update/employee-update.component';
import { AuthGuard } from './services/graphql/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Protected Routes
  //b
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-employee',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-update/:id',
    component: EmployeeUpdateComponent,
    canActivate: [AuthGuard]
  }
];
