import Product from "../../models/Product.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      modelNumber,
      brand,
      category,
      price,
      quantity,
      resolution,
      lens,
      poe,
      nightVision,
    } = req.body;

    if (!name || !modelNumber || !brand || !category || !price || !quantity) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const product = await Product.create({
      name,
      modelNumber,
      brand,
      category,
      price,
      quantity,
      resolution,
      lens,
      poe,
      nightVision,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

export default addProduct;
