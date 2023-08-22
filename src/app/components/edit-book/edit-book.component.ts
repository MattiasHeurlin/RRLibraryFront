import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/Book';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  @Input() book!: Book;
  @Output() bookEdited = new EventEmitter<boolean>();
   faTimes = faTimes;

  constructor(public activeModal: NgbActiveModal,  private bookService: BookService,) { }
 
  close(): void {
    this.activeModal.close();
  }
  onEditBook(): void {
    this.bookService.editBook(this.book).subscribe({
      next: (response) => {
        if (response.status === 204) {
          this.bookEdited.emit(true);
          this.close();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


}
