import cartModel from "./db/cart-schema";

const cartRepository = {
  getCart: async (userId: string) => {
    const cart = await cartModel.findOne({ userId });
    return cart;
  },

  createCart: async (userId: string) => {
    const newCart = new cartModel({ userId, books: [] });
    return await newCart.save();
  },

  addBookToCart: async (userId: string, book: any) => {
    let cart = await cartModel.findOne({ userId });

    const bookIndex = cart.books.findIndex((item: any) => item.id === book.id);

    if (bookIndex > -1) {
      cart.books[bookIndex].quantity += 1;
    } else {
      cart.books.push(book);
    }

    return await cart.save();
  },

  removeBookFromCart: async (userId: string, id: string) => {
    const cart = await cartModel.findOne({ userId });
    if (!cart) return null;

    cart.books = cart.books.filter((book: any) => book.id !== id);
    return await cart.save();
  },

  updateBookQuantity: async (userId: string, id: string, quantity: number) => {
    const cart = await cartModel.findOne({ userId });
    if (!cart) return null;

    const bookIndex = cart.books.findIndex((book: any) => book.id === id);
    if (bookIndex === -1) return null;

    cart.books[bookIndex].quantity = quantity;
    return await cart.save();
  },
};

export default cartRepository;
