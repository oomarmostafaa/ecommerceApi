import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { createdOnlineOrder } from './src/modules/order/controller/order.controller.js';
const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"))
app.post('/webhook', express.raw({type: 'application/json'}), createdOnlineOrder);

await dbConnection()
allRoutes(app)

app.get('/', (req, res) => res.send('Hello World!'))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        status: err.status || "error"
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


