import {Component, OnInit} from '@angular/core';
import {DepartmentsService} from '../../../services/departments.service';
import {Department} from '../../../models/Department';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/User';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  principal: User = null;

  focusUpdateDep: Department = null;

  count = 0;
  pageIndex = 1;
  pageSize = 2;
  countOfPages = 1;
  pages = [1];

  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.usersService.localPrincipal$.subscribe(p => this.principal = p);
    this.loadDeps();
  }

  createDep(depCreateForm: NgForm) {
    this.departmentsService.create(depCreateForm.value).subscribe(d => this.loadDeps());
    depCreateForm.resetForm({dpName: ''});
  }

  updateDep() {
    this.departmentsService
      .update(this.focusUpdateDep.dpId, {dpName: this.focusUpdateDep.dpName})
      .subscribe(() => {
        this.focusUpdateDep = null;
        this.loadDeps();
      });
  }

  deleteDep($event: Department) {
    this.departmentsService.remove($event.dpId).subscribe(() => {
      this.loadDeps();
    });
  }

  setFocusToUpdate($event: Department) {
    this.focusUpdateDep = $event;
  }

  private loadDeps() {
    this.departmentsService
      .getDepartments({
        limit: this.pageSize,
        skip: (this.pageIndex * this.pageSize) - this.pageSize
      })
      .subscribe(d => {
        this.calcPages(d.count);
        this.departments = d.models;
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
    this.loadDeps();
  }
}
