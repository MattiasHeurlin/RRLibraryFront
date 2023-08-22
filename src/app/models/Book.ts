export class Book {
    id?: number;
    title: string;
    author: string;
    publishedDate: string;
    isAvailable: boolean;

    constructor(title: string, author: string, publishedDate: string, isAvailable: boolean, id?: number) {
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isAvailable = isAvailable;
    }
}