import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../../models/Employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  @Input() employees: Employee[] = [];
  @Input() canDelete = false;
  @Input() canUpdate = false;

  @Output() onUpdateClick = new EventEmitter<Employee>();
  @Output() onDeleteClick = new EventEmitter<Employee>();

  constructor() {
  }

  ngOnInit() {
  }

  emitUpdate(emp: Employee) {
    this.onUpdateClick.emit(emp);
  }

  emitDelete(emp: Employee) {
    this.onDeleteClick.emit(emp);
  }
}
