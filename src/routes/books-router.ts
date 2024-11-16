import { Response, Router } from "express";
import {
  TRequestWithBody,
  TRequestWithParams,
  TRequestWithParamsAndBody,
  TRequestWithQuery,
} from "../types/types";
import {
  BooksViewModel,
  BookViewModel,
  PaginatedBooksViewModel,
} from "../types/models";
import { body, query } from "express-validator";
import { nameValidationMiddleware } from "../middlewares/books-middlewares";
import booksService from "../domain/books-service";
// import { validationResult } from "express-validator";

const booksRouter = Router({});

// // Update the search route
// booksRouter.get(
//   "/search",
//   query("name").isString().notEmpty().withMessage("Search query is required"),
//   async (
//     req: TRequestWithQuery<{ name: string }>,
//     res: Response<BooksViewModel | { errors: any[] }>
//   ) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const searchQuery = req.query.name;
//     const books = await booksService.searchBooks(searchQuery);
//     res.json(books);
//   }
// );

// Update the paginated route to include search functionality
booksRouter.get(
  "/paginated",
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("search").optional().isString(),
  async (
    req: TRequestWithQuery<{ page?: number; limit?: number; search?: string }>,
    res: Response<PaginatedBooksViewModel>
  ) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || "";

    const paginatedBooks = await booksService.getPaginatedBooks(
      page,
      limit,
      search
    );
    res.json(paginatedBooks);
  }
);

booksRouter.get(
  "/",
  // authMiddleware,
  async (req: any, res: Response<BooksViewModel>) => {
    const userId = (req as any).userId;
    const books = await booksService.getBooks();
    res.json(books);
  }
);

booksRouter.get(
  "/:name",
  async (
    req: TRequestWithParams<{ name: string }>,
    res: Response<BookViewModel>
  ) => {
    const name = req.params.name;
    const book = await booksService.findBookByName(name);

    if (book) {
      res.json(book);
    } else {
      res.sendStatus(404);
    }
  }
);

const nameValidation = body("name")
  .isString()
  .isLength({ min: 3 })
  .withMessage("Name must be at least 3 characters long");

booksRouter.post(
  "/",
  nameValidation,
  nameValidationMiddleware,
  async (
    req: TRequestWithBody<{ name: string; price: number; thumbnail: string }>,
    res: Response<BookViewModel>
  ) => {
    const bookName = req.body.name;
    const bookPrice = req.body.price;
    const bookThumbnail = req.body.thumbnail;

    const newBook = await booksService.createBook(
      bookName,
      bookPrice,
      bookThumbnail
    );
    res.json(newBook);
  }
);

booksRouter.put(
  "/:id",
  nameValidation,
  nameValidationMiddleware,
  async (
    req: TRequestWithParamsAndBody<{ id: string }, { name: string }>,
    res: Response<BookViewModel>
  ) => {
    const id = req.params.id;
    const bookName = req.body.name;

    const book = await booksService.updateBook(id, bookName);

    if (!book) {
      res.sendStatus(404);
    } else {
      res.json(book);
    }
  }
);

booksRouter.delete(
  "/:id",
  async (req: TRequestWithParams<{ id: string }>, res: Response<string>) => {
    const id = req.params.id;

    const isDeleted = await booksService.deleteBook(id);

    if (isDeleted) {
      res.json("Book deleted");
    } else {
      res.status(404).json("Book not found");
    }
  }
);

export default booksRouter;
