import pkg from "@prisma/client";
import asyncHandler from "express-async-handler";
import { cloudImgUpload, createSlug, deleteCloudImage } from "../utils/helper.js";
import dotenv from "dotenv";


const { PrismaClient } = pkg;
const prisma = new PrismaClient();
dotenv.config();


// get all Category
export const getCategorys = asyncHandler(async (req, res) => {
  const data = await prisma.category.findMany();
  res.status(200).json(data);
});

// create a Category

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

    let cloudImage = null;
    console.log(req.file);
    

  if (req.file) {
    
    cloudImage = await cloudImgUpload({
      file: req.file.buffer, 
      filename: req.file.originalname,
      cloudName: "drpihbzih",
      preset: "test_upload",
    });
  }

  const data = await prisma.category.create({
    data: {
      name,
      slug: createSlug(name),
      image: cloudImage?.secure_url || null,
      public_id: cloudImage?.public_id || null,
    },
  });
  res.status(201).json(data);
});

// getSingle Data

export const getSingleCategory= asyncHandler(async (req, res) => {
  const data = await prisma.category.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(data);
});

// delete brand
export const deleteCategory = asyncHandler(async (req, res) => {
  const data = await prisma.category.delete({
    where: { id: req.params.id },
  });
    
    if (data.public_id) {
        deleteCloudImage(data.public_id)
    }
  res.status(200).json(data);
});

// update brands
export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const data = await prisma.category.update({
    where: { id: req.params.id },
    data: {
      name,
      slug: createSlug(name),
    },
  });
  res.status(200).json(data);
});
