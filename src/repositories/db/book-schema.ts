const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});

export default mongoose.model("Book", bookSchema);
