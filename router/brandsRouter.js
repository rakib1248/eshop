import express from "express";

import {
  createBrands,
  deleteBrands,
  getBrands,
  getSingleBrand,
  updateBrands,
} from "../controller/brandsController.js";
import { brandMulter, formSupport } from "../middlewares/multerMiddleware.js";

const router = express.Router();



router.get("/brands", getBrands);
router.post("/brands", brandMulter, createBrands);
router.get("/brands/:id", getSingleBrand);
router.delete("/brands/:id", deleteBrands);
router.put("/brands/:id", formSupport, updateBrands);

export default router;
