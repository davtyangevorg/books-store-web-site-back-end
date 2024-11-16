export type BookViewModel = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
};

export type BooksViewModel = BookViewModel[];

export type PaginatedBooksViewModel = {
  books: BookViewModel[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type UserViewModel = {
  id: string;
  name: string;
  email: string;
};

export type CartBookViewModel = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  thumbnail: string;
};

export type CartViewModel = {
  userId: string;
  books: CartBookViewModel[];
};
