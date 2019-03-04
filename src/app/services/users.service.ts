import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  localPrincipal$ = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient
  ) {
    this.principal().subscribe();
  }

  signIn(login: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.api}/users/login`, {login, password})
      .pipe(map((p) => {
        this.localPrincipal$.next(p);
        return p;
      }));
  }

  signUp(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.api}/users/register`, user)
      .pipe(map((p) => {
        this.localPrincipal$.next(p);
        return p;
      }));
  }

  logout(): Observable<any> {
    return this.httpClient
      .get(`${environment.api}/users/logout`)
      .pipe(map((p) => {
        this.localPrincipal$.next(null);
        return p;
      }));
  }

  principal(): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.api}/users/principal`)
      .pipe(map((p) => {
        this.localPrincipal$.next(p);
        return p;
      }));
  }
}
