export interface Book {
    id: number;
    name: string;
    category: string;
    state: string;
    authorId: number;
    authorName: string;
    date_published: string;
}

export interface UpdateBookDto {
    name: string;
    category: string;
    state: string;
    authorId: number;
    date_published: string | null;
}
