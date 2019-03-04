import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../models/Department';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {

  @Input() departments: Department[] = [];
  @Input() canDelete = false;
  @Input() canUpdate = false;

  @Output() onUpdateClick = new EventEmitter<Department>();
  @Output() onDeleteClick = new EventEmitter<Department>();

  constructor() {
  }

  ngOnInit() {
  }

  emitUpdate(dep: Department) {
    this.onUpdateClick.emit(dep);
  }

  emitDelete(dep: Department) {
    this.onDeleteClick.emit(dep);
  }
}
