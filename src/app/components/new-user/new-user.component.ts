import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpResponse } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  @Output() userCreated = new EventEmitter<boolean>();
  user: User = {
    name: '',
    password: '',
  };
  emptyFields: boolean = false;
  constructor(private loginService: LoginService) {}

  createUser(): void {
    if (this.user.name === '' || this.user.password === '') {
      this.emptyFields = true;
      return;
    }
    this.loginService.createUser(this.user).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response);
        if (response.status === 200) {
          
          this.userCreated.emit(true);
          return;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
