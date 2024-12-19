const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
    const user = await prisma.user.findMany({
      include: {
        products: true,
      },
    });
    res.json(user);

};