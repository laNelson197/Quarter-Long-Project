import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({
    path: "./config.env"
})

//destructuring our env values
const {PORT, DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;


// Connect to the database
let connect
try {
    connect = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD
    });
    //console.log(connect)
    console.log(`Connected to MySQL on ${DB_PORT}`);
} catch (error) {
    console.error('Error connecting to the database:', error.message);
}

// Get products
async function getProducts() {
    const [results] = await connect.query("SELECT * FROM products");
    return results;
}

// Get By ID
async function getProductById(id) {
    const [results] = await connect.query("SELECT * FROM products WHERE productId=?", 
        [id]
    )
    return results;
}

// Add Product
async function addProduct(productName, price, productDescription, inStock) {
    const [result] = await connect.query("INSERT INTO products (productName, price, productDescription, inStock) VALUES (?, ?, ?, ?)", 
        [productName, price, productDescription, inStock]);
    return result;
}

// Update Product by ID
async function updateProduct(productName, price, productDescription, inStock, id) {
    const [result] = await connect.query( `
        UPDATE products
        SET productName = ?,
            price = ?,
            productDescription = ?,
            inStock = ?
        WHERE productId = ?;
        `, [productName, price, productDescription, inStock, id]);

    return result;
}

// Delete Product by ID
async function deleteProduct(id) {
    const [result] = await connect.query(`DELETE FROM products WHERE productId = ?`, [id]);
    return result;
}

export default { getProducts, getProductById, addProduct, updateProduct, deleteProduct }