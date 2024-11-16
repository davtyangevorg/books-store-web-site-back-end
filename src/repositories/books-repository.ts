import { booksModel } from "./db";

const booksRepository = {
  getBooks: async () => {
    const books = await booksModel.find();
    return books;
  },
  findBookByName: async (name: string) => {
    const book = await booksModel.findOne({ name });
    return book;
  },
  createBook: async (newBook: {
    name: string;
    price: number;
    thumbnail: string;
    id: string;
  }) => {
    const newBk = new booksModel(newBook);
    const savedBook = await newBk.save();
    return savedBook;
  },
  updateBook: async (id: string, name: string) => {
    const book = await booksModel.findOneAndUpdate(
      { id },
      { name },
      { new: true }
    );

    return book;
  },
  deleteBook: async (id: string) => {
    const book = await booksModel.findOneAndDelete({ id });
    return book;
  },
  getPaginatedBooks: async (page: number, limit: number, query: any = {}) => {
    const skip = (page - 1) * limit;
    const books = await booksModel.find(query).skip(skip).limit(limit);
    const total = await booksModel.countDocuments(query);
    return { books, total };
  },
  countDocuments: async (query: any = {}) => {
    return booksModel.countDocuments(query);
  },
  find: async (query: any = {}) => {
    return booksModel.find(query);
  },
};

export default booksRepository;
