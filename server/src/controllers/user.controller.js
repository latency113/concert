const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});
    res.json(user);
  } catch (error) {
    res.json("error");
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
    res.json(user);
} catch (error) {
    res.json('Error')
}
};
