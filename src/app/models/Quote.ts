export class Quote {
    id?: number;
    text: string;
    author: string;

    constructor( text: string, author: string) {
        this.author = author;
        this.text = text;
    }
}
