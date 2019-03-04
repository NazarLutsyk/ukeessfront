import {Component} from '@angular/core';
import {UsersService} from './services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public usersService: UsersService,
    private router: Router
  ) {
  }

  logout() {
    this.usersService.logout().subscribe(() => {
      this.router.navigate(['auth']);
    });
  }
}
