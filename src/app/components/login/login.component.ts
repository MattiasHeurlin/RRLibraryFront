import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpResponse } from '@angular/common/http';

import { Token } from '../../models/Token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<boolean>();
  isLoading: boolean = false;
  signUp: boolean = false;
  faTimes = faTimes;
  newUserCreated: boolean = false;
  name: string = '';
  password: string = '';
  invalidLoggin: boolean = false;
  invalidLogginMsg: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService
  ) {}

  onLogin(): void {
    if (this.name === '' || this.password === '') {
      this.invalidLoggin = true;
      this.invalidLogginMsg = 'Please enter a username and password';
      return;
    }
    this.isLoading = true;
    this.loginService.login(this.name, this.password).subscribe({
      next: (response: HttpResponse<Token>) => {
        this.isLoading = false;
        if (response.status === 200) {
          console.log(response);
          const token = response.body?.token;
          if (token) {
            localStorage.setItem('token', token);
            this.loggedIn.emit(true);
            this.invalidLoggin = false;
            this.close();
            return;
          }
        }
        this.invalidLogginMsg = 'Unknown error';
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.invalidLoggin = true;
          this.invalidLogginMsg = 'User not found';
          return;
        }
        if (error.status === 401) {
          this.invalidLoggin = true;
          this.invalidLogginMsg = 'Incorrect Password';
          return;
        }
        console.log(error);
        this.invalidLoggin = true;
        this.invalidLogginMsg = 'Unknown error';
      },
    });
  }
  close() {
    this.activeModal.close('Close click');
  }
  onNewSignUp() {
    this.signUp = false;
    this.newUserCreated = true;
  }

  toggleSignUp(): void {
    this.signUp = !this.signUp;
  }
}
