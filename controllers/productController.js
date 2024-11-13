import db from './../db/productsDb.js';

// Define routes- get all products
export const getProd = async (req, res) => {
    const products = await db.getProducts();
    res.status(200).send({
        message: `Returning ${products.length} products`,
        products
    })
}

// Get product by id
export const getById = async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await db.getProductById(id);

    if (result.length !== 0) {
        const product = result[0];
        res.status(200).json({
            message: `Found product with id ${id}`,
            product
        })
    }  else {
        res.status(404).json({
            message: `Record not found with id ${id}`
        })
    }
}

// Add product
export const addProd = async (req, res) => {
    const { productName, productDescription, price, inStock } = req.body;
    const result = await db.addProduct(productName, price, productDescription, inStock);

    res.status(201).send({
        message: `Product saved with ID: ${result.insertId}`
    })
}

// Update product by ID
export const updateProd = async (req, res) => {
    const id = parseInt(req.params.id);

    const { productName, productDescription, price, inStock} = req.body;
    const result = await db.updateProduct(productName, price, productDescription, inStock, id);

    if (result.affectedRows > 0) {
        res.status(200).send({
            message: `Product updated with ID: ${id}`
        });
    }else {
        res.status(404).send({
            message: `Product with ID: ${id} not found`
        })
    }
};

// Delete product by ID
export const delProd = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.deleteProduct(id);

        res.status(204).send({
            message: `Removing ${result}`,
        })
};