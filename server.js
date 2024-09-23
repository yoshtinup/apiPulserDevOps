import express from "express";
import signale from "signale";
import { history_userRouter } from "./v1/router/loginRouter.js";


import cors from "./node_modules/cors/lib/index.js";

const app = express()
app.use(cors());
app.use(express.json())
app.use("/v1/api/history_user",history_userRouter);

app.listen(3002, ()=> {
    signale.success("Server online in port 3002")
})