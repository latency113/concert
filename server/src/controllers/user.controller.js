// controllers/user.controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");  // ใช้ JWT ในการตรวจสอบ token

// ฟังก์ชันนี้จะถูกเรียกหลังจากผ่าน middleware `verifyToken`
exports.get = async (req, res) => {
  try {
    const userId = req.userId; // ใช้ userId ที่ได้จาก middleware

    // ดึงข้อมูลของผู้ใช้จากฐานข้อมูลตาม userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // ถ้าไม่พบผู้ใช้
    }

    res.status(200).json(user); // ส่งข้อมูลผู้ใช้กลับไป
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // ถ้ามีข้อผิดพลาด
  }
};

// ฟังก์ชันนี้จะใช้ middleware ตรวจสอบ token เช่นเดียวกับ `get`
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // ใช้ userId ที่ได้จาก middleware

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // ส่งข้อมูลผู้ใช้กลับไปที่ frontend
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
