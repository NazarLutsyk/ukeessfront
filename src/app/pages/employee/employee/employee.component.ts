import {Component, OnInit} from '@angular/core';
import {EmployeesService} from '../../../services/employees.service';
import {User} from '../../../models/User';
import {UsersService} from '../../../services/users.service';
import {Employee} from '../../../models/Employee';
import {NgForm} from '@angular/forms';
import {DepartmentsService} from '../../../services/departments.service';
import {Department} from '../../../models/Department';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  principal: User = null;

  departments: Department[] = [];

  focusUpdateEmp: Employee = null;

  nameFilter = '';

  count = 0;
  pageIndex = 1;
  pageSize = 2;
  countOfPages = 1;
  pages = [1];

  constructor(
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.departmentsService.getDepartments().subscribe(deps => this.departments = deps.models);
    this.usersService.localPrincipal$.subscribe(p => this.principal = p);
    this.loadEmps();
  }

  createEmp(empCreateForm: NgForm) {
    this.employeesService.create({
      empName: empCreateForm.value.empName,
      empActive: empCreateForm.value.empActive ? 1 : 0,
      empDpID: empCreateForm.value.empDpID,
    }).subscribe(d => this.loadEmps());
    empCreateForm.resetForm({
      empName: '',
      empActive: '',
      empDpID: '',
    });
  }

  updateEmp() {
    this.employeesService
      .update(
        this.focusUpdateEmp.empId,
        {
          empName: this.focusUpdateEmp.empName,
          empActive: this.focusUpdateEmp.empActive ? 1 : 0,
          empDpID: this.focusUpdateEmp.empDpID,
        }
      )
      .subscribe(() => {
        this.focusUpdateEmp = null;
        this.loadEmps();
      });
  }

  deleteEmp($event: Employee) {
    this.employeesService.remove($event.empId).subscribe(() => {
      this.loadEmps();
    });
  }

  setFocusToUpdate($event: Employee) {
    this.focusUpdateEmp = $event;
  }

  private loadEmps() {
    this.employeesService
      .getEmployees({
        include: ['departments'],
        limit: this.pageSize,
        name: this.nameFilter,
        skip: (this.pageIndex * this.pageSize) - this.pageSize
      })
      .subscribe(e => {
        this.calcPages(e.count);
        if (this.pageIndex > this.countOfPages) {
          this.pageIndex = this.countOfPages;
        }
        this.employees = e.models;
      });

  }

  calcPages(count) {
    this.count = count;
    const tempCountOfPages = Math.ceil(this.count / this.pageSize);
    this.countOfPages = tempCountOfPages ? tempCountOfPages : 1;
    this.pages = Array(this.countOfPages).fill(0).map((x, i) => i + 1);
  }

  loadPaginated(page: any) {
    this.pageIndex = page;
    this.loadEmps();
  }


}
