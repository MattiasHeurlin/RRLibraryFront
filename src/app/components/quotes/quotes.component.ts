import { Component, Input } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from '../../models/Quote';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent {
  @Input() isLoggedIn!: boolean;
  @Input() dayMode!: boolean;
  newQuoteText: string = '';
  newQuoteAuthor: string = '';
  quotes: Quote[] = [];
  noQuotes: boolean = false;
  faTimes = faTimes;
  emptyFields: boolean = false;
  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe({
      next: (response) => {
        if (response.status === 200 && response.body) {
          this.quotes = response.body;
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status === 404) {
          this.noQuotes = true;
        }
      },
    });
  }

  addQuote(): void {
    if (this.newQuoteText === '') {
      this.emptyFields = true;
      return;
    }
    const quote: Quote = new Quote(this.newQuoteText, this.newQuoteAuthor);
    this.quoteService.addQuote(quote).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.newQuoteText = '';
          this.newQuoteAuthor = '';
          this.emptyFields = false;
          this.ngOnInit();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteQuote(quote: Quote): void {
    if (quote.id) {
      this.quoteService.deleteQuote(quote.id).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.quotes = [];
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
