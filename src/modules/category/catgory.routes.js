import express from 'express';
import {
    addCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from './controller/category.controller.js';

import { validation } from '../../middleware/validation.js';
import {
    addCategorySchema,
    categoryQueryIdSchema,
    updateCategorySchema
} from './category.validation.js';

import { uploadSingleFile } from '../../utils/service/fileUpload.js';
import subCategoryRoutes from '../subCategory/subCategory.routes.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.use("/:category/subCategory", subCategoryRoutes);

// CREATE
categoryRoutes.route("/")
    .post(
        protectedRoutes,
        allowTo('admin', 'user'),
        uploadSingleFile('image'),
        validation(addCategorySchema),
        addCategory
    )
    .get(getAllCategories);

// SINGLE CATEGORY
categoryRoutes.route("/:id")
    .get(validation(categoryQueryIdSchema), getCategoryById)

    // UPDATE (FIXED)
    .patch(
    uploadSingleFile('image'),
    validation(updateCategorySchema),
    updateCategory
)

    .delete(validation(categoryQueryIdSchema), deleteCategory);

export default categoryRoutes;