export class Quote {
    id?: number;
    text: string;
    author: string;

    constructor( author: string, text: string) {
        this.author = author;
        this.text = text;
    }
}
