import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../../models/Book';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book!: Book;
  @Input() isLoggedIn!: boolean;
  @Output() bookDeleted = new EventEmitter<Book>();
  @Output() listUpdate = new EventEmitter();

  faTimes = faTimes;
  faCheck = faCheck;
  constructor(private modalService: NgbModal) {}

  deleteBook(): void {
    this.bookDeleted.emit(this.book);
  }

  openEditModal(): void {
    const modalRef = this.modalService.open(EditBookComponent);
    modalRef.componentInstance.book = this.book;
    modalRef.componentInstance.bookEdited.subscribe((bookEdited: boolean) => {
      if (bookEdited) {
        this.listUpdate.emit();
      }
    });
  }
}
