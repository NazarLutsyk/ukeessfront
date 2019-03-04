import {Department} from './Department';

export interface Employee extends Department {
  empId?: number;
  empName?: string;
  empActive?: number;
  empDpID?: string;
}
