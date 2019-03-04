import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department/department.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DepartmentComponent, DepartmentTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
