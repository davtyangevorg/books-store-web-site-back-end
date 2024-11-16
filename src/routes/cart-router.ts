import { Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import cartService from "../domain/cart-service";

const cartRouter = Router({});

cartRouter.get("/", authMiddleware, async (req: any, res: Response) => {
  const userId = req.userId;
  try {
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Error getting cart",
    });
  }
});

cartRouter.post("/add", authMiddleware, async (req: any, res: Response) => {
  const userId = req.userId;
  const { book } = req.body;

  try {
    const cart = await cartService.addBookToCart(userId, book);
    res.json(cart);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error adding book to cart",
    });
  }
});

cartRouter.delete(
  "/remove/:id",
  authMiddleware,
  async (req: any, res: Response) => {
    const userId = req.userId;
    const { id } = req.params;

    try {
      const cart = await cartService.removeBookFromCart(userId, id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error removing book from cart",
      });
    }
  }
);

cartRouter.put(
  "/update/:id",
  authMiddleware,
  async (req: any, res: Response) => {
    const userId = req.userId;
    const { id } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await cartService.updateBookQuantity(userId, id, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error ? error.message : "Error updating quantity",
      });
    }
  }
);

export default cartRouter;
