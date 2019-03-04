import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../models/Employee';
import {addParams} from '../helpers/url.helper';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employeeURL = `${environment.api}/employees`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getEmployeeById(id: number, query = {}): Observable<Employee> {
    const urlToRequest = addParams(`${this.employeeURL}/${id}`, query);
    return this.http.get<Employee>(urlToRequest);
  }

  getEmployees(query = {}): Observable<{ models: Employee[], count: number }> {
    const urlToRequest = addParams(`${this.employeeURL}`, query);
    return this.http.get<{ models: Employee[], count: number }>(urlToRequest);
  }

  create(model: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeURL}`, model);
  }

  remove(id: number | string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.employeeURL}/${id}`);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.employeeURL}/${id}`, employee);
  }
}
