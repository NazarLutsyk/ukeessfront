import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/Department';
import {addParams} from '../helpers/url.helper';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  departmentURL = `${environment.api}/departments`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDepartmentById(id: number, query = {}): Observable<Department> {
    const urlToRequest = addParams(`${this.departmentURL}/${id}`, query);
    return this.http.get<Department>(urlToRequest);
  }

  getDepartments(query = {}): Observable<{models: Department[], count: number}> {
    const urlToRequest = addParams(`${this.departmentURL}`, query);
    return this.http.get<{models: Department[], count: number}>(urlToRequest);
  }

  create(model: Department): Observable<Department> {
    return this.http.post<Department>(`${this.departmentURL}`, model);
  }

  remove(id: number | string): Observable<Department> {
    return this.http.delete<Department>(`${this.departmentURL}/${id}`);
  }

  update(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.departmentURL}/${id}`, department);
  }
}
