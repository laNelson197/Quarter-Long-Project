import express from 'express';
import productRouter from './routers/productsRouter.js';
//import customerRouter from './routers/customerRouter.js';

const app = express();

//serve up static files from the /public directory
app.use(express.static("./public"))

//configure your web server to parse JSON in a request body
app.use(express.json());

//mount the router!
app.use("/products", productRouter);
//app.use("/customers", customerRouter);


// Start the server
app.listen(3000, () => console.log(`Server started on http://localhost:3000`));