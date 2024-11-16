import cartRepository from "../repositories/cart-repository";
import {
  BookViewModel,
  CartBookViewModel,
  CartViewModel,
} from "../types/models";

const cartService = {
  getCart: async (userId: string): Promise<CartViewModel> => {
    let cart = await cartRepository.getCart(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }

    return mapCartToViewModel(cart);
  },

  addBookToCart: async (
    userId: string,
    book: BookViewModel
  ): Promise<CartViewModel> => {
    let cart = await cartRepository.getCart(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }

    const bookToAdd: CartBookViewModel = {
      id: book.id,
      name: book.name,
      price: book.price,
      thumbnail: book.thumbnail,
      quantity: 1,
    };

    const updatedCart = await cartRepository.addBookToCart(userId, bookToAdd);
    return mapCartToViewModel(updatedCart);
  },

  removeBookFromCart: async (
    userId: string,
    id: string
  ): Promise<CartViewModel | null> => {
    const updatedCart = await cartRepository.removeBookFromCart(userId, id);
    if (!updatedCart) return null;
    return mapCartToViewModel(updatedCart);
  },

  updateBookQuantity: async (
    userId: string,
    id: string,
    quantity: number
  ): Promise<CartViewModel | null> => {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
    const updatedCart = await cartRepository.updateBookQuantity(
      userId,
      id,
      quantity
    );
    if (!updatedCart) return null;
    return mapCartToViewModel(updatedCart);
  },
};

// Helper function to map database cart to view model
const mapCartToViewModel = (cart: any): CartViewModel => {
  return {
    userId: cart.userId,
    books: cart.books.map(
      (book: any): CartBookViewModel => ({
        id: book.id,
        name: book.name,
        price: book.price,
        thumbnail: book.thumbnail,
        quantity: book.quantity,
      })
    ),
  };
};

export default cartService;
