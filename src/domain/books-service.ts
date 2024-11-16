import booksRepository from "../repositories/books-repository";
import { v4 as uuidv4 } from "uuid";
import { BookViewModel, PaginatedBooksViewModel } from "../types/models"; // Assume we have these types defined

const booksService = {
  getBooks: async () => {
    return booksRepository.getBooks();
  },
  findBookByName: async (name: string) => {
    return booksRepository.findBookByName(name);
  },
  createBook: async (name: string, price: number, thumbnail: string) => {
    const newBook = {
      name,
      price,
      thumbnail,
      id: uuidv4(), // Generate a unique UUID
    };

    return booksRepository.createBook(newBook);
  },
  updateBook: async (id: string, name: string) => {
    return booksRepository.updateBook(id, name);
  },
  deleteBook: async (id: string) => {
    return booksRepository.deleteBook(id);
  },
  getPaginatedBooks: async (
    page: number,
    limit: number,
    search: string = ""
  ): Promise<PaginatedBooksViewModel> => {
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }

    const { books, total } = await booksRepository.getPaginatedBooks(
      page,
      limit,
      query
    );

    return {
      books: books.map(mapBookToViewModel),
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  },
  searchBooks: async (searchQuery: string) => {
    const query = { name: { $regex: searchQuery, $options: "i" } };
    return booksRepository.find(query);
  },
};

// Helper function to map database book to view model
const mapBookToViewModel = (book: BookViewModel) => {
  // Implement the mapping logic here
  return {
    id: book.id,
    name: book.name,
    price: book.price,
    thumbnail: book.thumbnail,
  };
};

export default booksService;
