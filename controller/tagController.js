import pkg from "@prisma/client";
import asyncHandler from "express-async-handler";
import { createSlug } from "../utils/helper.js";
import dotenv from "dotenv";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
dotenv.config();

// get all Category
export const getTags = asyncHandler(async (req, res) => {
  const data = await prisma.tag.findMany();
  res.status(200).json(data);
});

// create a Category

export const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const data = await prisma.tag.create({
    data: {
      name,
      slug: createSlug(name),
      //   image: cloudImage?.secure_url || null,
      //   public_id: cloudImage?.public_id || null,
    },
  });
  res.status(201).json(data);
});

// getSingle Data

export const getSingleTag = asyncHandler(async (req, res) => {
  const data = await prisma.tag.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(data);
});

// delete brand
export const deleteTag = asyncHandler(async (req, res) => {
  const data = await prisma.tag.delete({
    where: { id: req.params.id },
  });

  res.status(200).json(data);
});

// update brands
export const updateTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const data = await prisma.tag.update({
    where: { id: req.params.id },
    data: {
      name,
      slug: createSlug(name),
    },
  });
  res.status(200).json(data);
});
