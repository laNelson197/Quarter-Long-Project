import express from 'express';
//import * as controller from './../controllers/productController.js';

import {getProd, getById, addProd, updateProd, delProd } from './../controllers/productController.js';

const productRouter = express.Router();

//routes
productRouter.get("/", getProd);
productRouter.get("/:id", getById);
productRouter.post("/", addProd);
productRouter.patch("/:id", updateProd);
productRouter.delete("/:id", delProd);

export default productRouter;