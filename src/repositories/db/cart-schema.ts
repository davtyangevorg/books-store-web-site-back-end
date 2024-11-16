const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  books: [
    {
      _id: false,
      id: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
