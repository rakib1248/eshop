import pkg from "@prisma/client";
import asyncHandler from "express-async-handler";
import { cloudImgUpload, createSlug, deleteCloudImage } from "../utils/helper.js";
import dotenv from "dotenv";


const { PrismaClient } = pkg;
const prisma = new PrismaClient();
dotenv.config();


// get all brands
export const getBrands = asyncHandler(async (req, res) => {
  const data = await prisma.bernds.findMany();
  res.status(200).json(data);
});

// create a brands

export const createBrands = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { brand } = req.file;

    let cloudImage = null;
    console.log(brand);
    

  if (req.file) {
    
    cloudImage = await cloudImgUpload({
      file: req.file.buffer, 
      filename: req.file.originalname,
      cloudName: "drpihbzih",
      preset: "test_upload",
    });
  }

  const data = await prisma.bernds.create({
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

export const getSingleBrand = asyncHandler(async (req, res) => {
  const data = await prisma.bernds.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(data);
});

// delete brand
export const deleteBrands = asyncHandler(async (req, res) => {
  const data = await prisma.bernds.delete({
    where: { id: req.params.id },
  });
    
    if (data.public_id) {
        deleteCloudImage(data.public_id)
    }
  res.status(200).json(data);
});

// update brands
export const updateBrands = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const data = await prisma.bernds.update({
    where: { id: req.params.id },
    data: {
      name,
      slug: createSlug(name),
    },
  });
  res.status(200).json(data);
});
