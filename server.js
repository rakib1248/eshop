import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import brandsRoute from "./router/brandsRouter.js";
import categoryRoute from "./router/Category.js";
import tagRoute from "./router/tagRouter.js";

// init Express
const app = express();
// env config

dotenv.config();

// init Port

const PORT = process.env.PORT || 6060;

// support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Router

app.use("/api/v1", brandsRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", tagRoute);

// Listen Server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
