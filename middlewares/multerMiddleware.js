import multer from "multer";
import storage from "../utils/multer.js";

export const brandMulter = multer({ storage }).single("file");
export const categoryMulter = multer({ storage }).single("file");


// supporting form 
export const formSupport = multer({storage}).none()
