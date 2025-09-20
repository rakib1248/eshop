import multer from "multer";

export const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
  destination: (req, file, cb) => {
    if (file.fieldname === "brand") {
      cb(null, "public/brands");
    }
    if (file.fieldname === "category") {
      cb(null, "public/category");
    }
  },
});

// memoryStorage storage

const memoryStorage = multer.memoryStorage()

export default memoryStorage;
