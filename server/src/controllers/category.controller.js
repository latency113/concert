const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
    const category = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    res.json(category);

};
exports.getById = async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.findMany({
      where:{
        id:parseInt(id),
      },
      include:{
        products:true,
      }
    });
    res.json(category);
};

