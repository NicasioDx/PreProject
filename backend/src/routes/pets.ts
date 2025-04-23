import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// แก้ไขหรือลบการใช้งาน `image`
router.post("/", async (req, res) => {
    try {
        const { name, species, age, description } = req.body;
        // ไม่มีการใช้ image แล้ว
        if (!name || !species || !age || !description) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
        }

        const newPet = await prisma.pet.create({
            data: {
                name,
                species,
                age: parseInt(age),
                description,
                // ลบการใช้งาน `image` ออกไป
            },
        });

        res.status(201).json({ message: "เพิ่มข้อมูลสัตว์เลี้ยงเรียบร้อยแล้ว", pet: newPet });
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }
});


// GET /pets
router.get("/", async (req, res) => {
    try {
        const pets = await prisma.pet.findMany();
        res.json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลสัตว์เลี้ยง" });
    }
});

export default router;
