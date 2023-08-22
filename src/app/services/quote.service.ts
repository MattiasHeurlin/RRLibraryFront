import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/Quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = 'rrlibrary.azurewebsites.net/api/';
  constructor(private http: HttpClient) { }

  getQuotes(): Observable<HttpResponse<Quote[]>> {
    return this.http.get<Quote[]>(this.apiUrl + 'Quotes', { observe: 'response' });
  }
  addQuote(quote: Quote): Observable<HttpResponse<Quote>> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
    });
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.post<Quote>(this.apiUrl + 'Quotes', quote, options);
  }

  deleteQuote(id: number): Observable<HttpResponse<Quote>> {
    console.log(id)
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') + ''
    });
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.delete<Quote>(this.apiUrl + 'Quotes/' + id, options);
  }
  
}
