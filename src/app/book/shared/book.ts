import { Thumbnail } from "./thumbnail";

export interface Book {
    id: string;
    isbn: string;
    title: string;
    authors: string[];
    sellers: BookSeller[];
    published?: Date;
    publishedDate?: Date;
    publishedTime?: Date;
    subtitle?: string;
    rating?: number;
    thumbnails?: Thumbnail[];
    description?: string;
    city?: string;
    genres: string[];
    ebook?: boolean;
    printed?: boolean;
    availability?: string;
}

export interface BookSeller {
    name: string;
    address: string;
    quantity: number;
    age: number;
    birthYear: number;
}
