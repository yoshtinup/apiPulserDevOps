import express from 'express'
import signale from 'signale';


import { history_userControl } from '../controllers/history_userControl.js';
export const history_userRouter = express.Router();


history_userRouter.get("/", history_userControl.getAllProducts);
history_userRouter.get("/:id", history_userControl.getOneProduct);
history_userRouter.post("/", history_userControl.createNewProduct);
history_userRouter.put("/:id",history_userControl.updateOneProduct);
history_userRouter.delete("/:id",history_userControl.deleteOneProduct);