import express from "express";

import { createTag, deleteTag, getSingleTag, getTags, updateTag } from "../controller/tagController.js";
import { formSupport } from "../middlewares/multerMiddleware.js";



const router = express.Router();


router.get("/tag", getTags);
router.post("/tag", formSupport, createTag);
router.get("/tag/:id", getSingleTag);
router.delete("/tag/:id", deleteTag);
router.patch("/tag/:id", formSupport, updateTag);

export default router;
