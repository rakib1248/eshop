import express from "express";

import { createCategory, deleteCategory, getCategorys, getSingleCategory, updateCategory } from "../controller/categoryController.js";
import { categoryMulter, formSupport } from "../middlewares/multerMiddleware.js";


const router = express.Router();



router.get("/category", getCategorys);
router.post("/category", categoryMulter, createCategory);
router.get("/category/:id", getSingleCategory);
router.delete("/category/:id", deleteCategory);
router.patch("/category/:id", formSupport, updateCategory);

export default router;
