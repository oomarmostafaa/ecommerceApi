


import express from 'express';
import {  addUser,checkEmail, deleteUser, getAllUsers, getUserById, updateUser } from './controller/user.controller.js';
import { validation } from '../../middleware/validation.js';
import { addUserSchema, updateUserSchema, userQueryIdSchema } from './user.validation.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';

const userRoutes = express.Router();



userRoutes.route("/")
    .post(checkEmail,validation(addUserSchema), addUser)
    .get(protectedRoutes,getAllUsers)

userRoutes.route("/:id")
.get(protectedRoutes,validation(userQueryIdSchema),getUserById)
.patch(protectedRoutes,validation(updateUserSchema),updateUser)
.delete(protectedRoutes,validation(userQueryIdSchema),deleteUser)


export default userRoutes;