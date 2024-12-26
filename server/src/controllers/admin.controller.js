const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    res.json(order);
  } catch (error) {
    res.status(500).json({message:"Error"})
  }
};

exports.getStatus = async (req, res) => {
  try {
    const order = await prisma.order.findMany();
    res.json(order);
  } catch (error) {
    res.status(500).json({message:"Error"})
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const {id,status}= req.body
    const order = await prisma.order.update({
      where:{
        id:parseInt(id),
        status:status
      }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({message:"Error"})
  }
};
