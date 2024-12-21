const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const category = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        products: true,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    res.json({message: "หมวดหมู่สำเร็จ",category,});
  } catch (error) {
    console.error("เกิดข้อผิดพลาดระหว่างการหมวดหมู่:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, description } = req.body;
    const category = await prisma.category.update({
      where:{
        id:parseInt(id)
      },
      data: {
        name,
        description,
      },
    });
    res.json({message: "อัพเดตหมวดหมู่สำเร็จ",category,});
  } catch (error) {
    console.error("เกิดข้อผิดพลาดระหว่างการอัพเดตหมวดหมู่:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({message: "ลบคอนเสิร์ตสำเร็จ",category,});
  } catch (error) {
    console.error("เกิดข้อผิดพลาดระหว่างการลบคอนเสิร์ต:", error);
    res.status(500).json({ error: error.message });
  }
};