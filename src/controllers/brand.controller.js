const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const brand = await prisma.brand.findMany({
      include: {
        Concert: true,
      },
    });

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await prisma.brand.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Concert: true,
      },
    });

    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await prisma.brand.update({
      data: {
        name,
      },
    });

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await prisma.brand.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
