import { Component, Input } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../models/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../add-book/add-book.component';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: Book[] = [];
  @Input() isLoggedIn!: boolean;
  @Input() dayMode!: boolean;
  isLoading: boolean = false;
  noBooks: boolean = false;
  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (response) => {
        if (response.status === 200 && response.body) {
          this.isLoading = false;
          this.books = response.body;
        }
      
      },
      error: (error) => {
        console.log(error);
          if (error.status === 404) {
          this.isLoading = false;
          this.noBooks = true;
        } 
      },
    });
  }

  

  openAddBook(): void {
    const modalRef = this.modalService.open(AddBookComponent);
    modalRef.componentInstance.bookAdded.subscribe((bookAdded: boolean) => {
      if (bookAdded) console.log('updated');
      this.ngOnInit();
    });
  }

  onDeleteBook(book: Book): void {
    if (book.id) {
      this.bookService.deleteBook(book.id).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.books = [];
            this.ngOnInit();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

}
