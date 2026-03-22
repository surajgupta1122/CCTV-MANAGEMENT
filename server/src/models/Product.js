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
    
    // ✅ Add this field
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

// ✅ Add index for better performance
productSchema.index({ createdBy: 1, createdAt: -1 });

export default mongoose.model("Product", productSchema);