const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    const {id} = req.params
    const user = await prisma.user.findUnique({
      where : {
        id:parseInt(id)
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};