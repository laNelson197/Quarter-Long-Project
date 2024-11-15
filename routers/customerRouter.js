import { Router } from 'express';
import { getCust, getCustByName, addCust, updateCust, delCust } from './../controllers/customerController.js';

const customerRouter = Router();

//routes
customerRouter.get("/", getCust);
customerRouter.get("/:custName", getCustByName);
customerRouter.post("/", addCust);
customerRouter.patch("/:cust", updateCust);
customerRouter.delete("/:custName", delCust);

export default customerRouter;