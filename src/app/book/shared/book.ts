import { Thumbnail } from "./thumbnail";

export interface Book {
    id?: number;
    isbn: string;
    title: string;
    authors?: string[];
    sellers?: BookSeller[];
    published?: Date;
    publishedDate?: Date;
    publishedTime?: Date;
    subtitle?: string;
    rating?: number;
    thumbnails?: Thumbnail[];
    description?: string;
    city?: string;
    genres?: string[];
    ebook?: boolean;
    printed?: boolean;
    availability?: string;
    level?: string;
    pageSize?: number;
}

export interface BookSeller {
    name: string;
    address: string;
    quantity: number;
    age: number;
    birthYear: number;
}
