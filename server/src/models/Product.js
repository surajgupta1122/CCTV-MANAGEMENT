import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    modelNumber: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    resolution: { type: String },
    lens: { type: String },

    poe: { type: Boolean, default: false },
    nightVision: { type: Boolean, default: false },

    // 🔐 VERY IMPORTANT (USER OWNERSHIP)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);