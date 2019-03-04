import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
  {path: 'employees', loadChildren: './pages/employee/employee.module#EmployeeModule'},
  {path: 'departments', loadChildren: './pages/department/department.module#DepartmentModule'},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
