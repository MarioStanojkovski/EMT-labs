export interface Author {
    id: number;
    name: string;
    surname: string;
    countryId: number;
    countryName: string;
}
export interface AuthorDetails {
    id: number,
    name: string;
    surname: string;
    country: Country;
}

export interface AuthorFormData {
    name: string;
    surname: string;
    countryId: number;
}

