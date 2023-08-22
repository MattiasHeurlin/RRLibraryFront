import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'FrontEnd';
  isLoggedIn: boolean = false;

  onLibraryPage: boolean = true;
  dayMode: boolean = true;

  constructor(private modalService: NgbModal) {
  }

  public openLoginModal(): void {
   const modalRef = this.modalService.open(LoginComponent, {backdrop: 'static'});
   modalRef.componentInstance.loggedIn.subscribe((loggedIn: boolean) => {
    if (loggedIn)
      this.isLoggedIn = true;
   })
  }

  navClick(clicked: string): void {
    if (clicked === 'library') {
      this.onLibraryPage = true;
    }
    else {
      this.onLibraryPage = false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token'))
      this.isLoggedIn = true;
  }

  toggleDayMode(): void {
    this.dayMode = !this.dayMode;
  }

}
