import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// POST /pets - เพิ่มข้อมูลสัตว์เลี้ยง
router.post("/", async (req, res) => {
  try {
    const { name, species, age, description, image } = req.body;

    if (!name || !species || !age || !description || !image) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }

    const newPet = await prisma.pet.create({
      data: {
        name,
        species,
        age,
        description,
        image,
      },
    });

    res.status(201).json({ message: "เพิ่มข้อมูลสัตว์เลี้ยงเรียบร้อยแล้ว", pet: newPet });
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
