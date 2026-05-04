import categoryModel from '../../../../db/models/category.model.js';
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';

// ➜ ADD CATEGORY
const addCategory = catchError(async (req, res) => {

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    let addedCategory = await new categoryModel(req.body).save();

    res.json({ message: "Done", addedCategory });
});


// ➜ GET ALL
const getAllCategories = catchError(async (req, res) => {
    let apiFeature = new APIFeature(categoryModel.find(), req.query);
    apiFeature.pagination();

    let allCategories = await apiFeature.mongooseQuery;

    res.json({ message: "Done", allCategories });
});


// ➜ GET BY ID
const getCategoryById = catchError(async (req, res) => {
    let category = await categoryModel.findById(req.params.id);

    res.json({ message: "Done", category });
});


// ➜ UPDATE CATEGORY (🔥 FIXED)
const updateCategory = catchError(async (req, res) => {

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    let updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedCategory) {
        return res.json({ message: "not found category" });
    }

    res.json({ message: "Done", updatedCategory });
});


// ➜ DELETE
const deleteCategory = deleteOne(categoryModel);

export {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};