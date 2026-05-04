


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { uploadFields, uploadSingleFile } from '../../utils/service/fileUpload.js';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './controller/product.controller.js';
import { addProductSchema, productIdSchema, updateProductSchema } from './product.validation.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
const productRoutes = express.Router();


productRoutes.route("/")
    .post(protectedRoutes,
    validation(addProductSchema), addProduct)
    .get(getAllProducts)

productRoutes.route("/:id")
.get(validation(productIdSchema),getProductById)
.patch(protectedRoutes,uploadFields([{name:"imgCover",maxCount:1}, {name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
.delete(protectedRoutes,validation(productIdSchema),deleteProduct)


export default productRoutes;