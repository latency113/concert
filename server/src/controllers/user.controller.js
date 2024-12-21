const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, password, phoneNumber} = req.body;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};