const Product = require("../model/Product")
const cloudinary = require("../config/cloudinary");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) {
            return res.json(products);
        }
        return res.status(404).json({ message: "products not found" });
    }
    catch {
        return res.status(500).json({ message: "Server Error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.json(product);
        }
        return res.status(404).json({ message: "product not found" });
    }
    catch {
        return res.status(500).json({ message: "Server Error" });
    }
}
const createProduct = async (req, res) => {
    try {
        let imageUrl = '';
        const { name, description, price, category, stock } = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const product = await Product.create({ name, description, price, category, stock, imageUrl });
        return res.status(201).json(product);
    }
    catch {
        return res.status(500).json({ message: "Server Error" });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            if (name !== undefined) product.name = name;
            if (description !== undefined) product.description = description;
            if (price !== undefined) product.price = price;
            if (category !== undefined) product.category = category;
            if (stock !== undefined) product.stock = stock;

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                product.imageUrl = imageUrl;
            }
            const updatedProduct = await product.save();
            return res.status(201).json(updatedProduct);
        }
        else {
            return res.status(404).json({ message: "product not found" });
        }
    }
    catch {
        return res.status(500).json({ message: "Server Error" });
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            return res.json({message: "Product deleted"});
        }
        return res.status(404).json({ message: "product not found" });
    }
    catch {
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}