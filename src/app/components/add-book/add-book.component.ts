import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../models/Book';
import { BookService } from 'src/app/services/book.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  @Output() bookAdded = new EventEmitter<boolean>();

  faTimes = faTimes;
  title: string = '';
  author: string = '';
  publishedDate: string = '';
  availability: boolean = true;
  
  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { }

  onAddBook(): void {
    const book: Book = new Book(this.title, this.author, this.publishedDate, this.availability);
    this.bookService.addBook(book).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.bookAdded.emit(true);
           this.close();
        }
       
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  close(): void {
    this.activeModal.close();
  }

}
