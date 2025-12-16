import express, {Request, Response } from "express";

import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todosRoutes } from "./modules/todos/todos.routes";
import { authRouters } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

initDB()

app.get('/',logger,(req:Request,res:Response)=>{
    res.send("Hello developer")
})

app.use("/users",userRoutes)

app.use("/todos",todosRoutes)

app.use("/auth",authRouters)

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message: 'Route not found',
        path: req.path
    })
})

export default app;