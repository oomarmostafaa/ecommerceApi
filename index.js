import dotenv from "dotenv";
dotenv.config();
console.log(process.env.STRIPE_SECRET_KEY);
import cors from "cors";
import express from "express";
import { dbConnection } from "./db/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { createdOnlineOrder } from "./src/modules/order/controller/order.controller.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// 🔥 webhook لازم قبل JSON
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  createdOnlineOrder
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

dbConnection();
allRoutes(app);

app.get("/", (req, res) => res.send("Hello World!"));

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || "error",
  });
});

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);