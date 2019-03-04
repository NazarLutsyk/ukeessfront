import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
  }

  login(loginForm: NgForm) {
    const {login, password} = loginForm.value;
    if (login && password) {
      this.usersService.signIn(login, password).subscribe((user) => {
        this.router.navigate(['employees']);
      });
    }
  }

  register(registerForm: NgForm) {
    const {login, password} = registerForm.value;
    if (login && password) {
      this.usersService.signUp({login, password}).subscribe((user) => {
        this.router.navigate(['employees']);
      });
    }
  }
}
