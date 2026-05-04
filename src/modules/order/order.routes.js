import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowTo, protectedRoutes } from "../auth/controller/auth.controller.js";
import {
  createCashOrder,
  createCheckoutURL,
  getAllOrders,
  getSpaificOrder
} from "./controller/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/:id", protectedRoutes, createCashOrder);

orderRoutes.get("/", protectedRoutes, getSpaificOrder);

orderRoutes.get("/all", protectedRoutes, allowTo("admin"), getAllOrders);

orderRoutes.post("/checkout/:id", protectedRoutes, createCheckoutURL);

// ❌ مفيش webhook هنا نهائي

export default orderRoutes;