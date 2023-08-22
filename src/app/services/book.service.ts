import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'rrlibrary.azurewebsites.net/api/';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<HttpResponse<Book[]>> {
    return this.http.get<Book[]>(this.apiUrl + 'Books', { observe: 'response' });
  }
  addBook(book: Book): Observable<HttpResponse<Book>> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
    });
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.post<Book>(this.apiUrl + 'Books', book, options);
  }

  deleteBook(id: number): Observable<HttpResponse<Book>> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
    });
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.delete<Book>(this.apiUrl + 'Books/' + id, options);
  }
  editBook(book: Book): Observable<HttpResponse<Book>> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
    });
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.put<Book>(this.apiUrl + 'Books/' + book.id, book, options);
  }
}
