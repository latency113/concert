const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

exports.get = async (req, res) => {
  try {
      const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });
  // Add image URL to each product
  const productsWithUrls = products.map((product) => ({
    ...product,
    pictureUrl: product.picture
      ? `${req.protocol}://${req.get("host")}/images/${product.picture}`
      : null,
  }));
  res.json(productsWithUrls);
  } catch (error) {
    res.json("error")
  }

};

exports.getById = async (req, res) => {
  try {
      const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Category: true,
    },
  });
  // Add image URL to the product
  if (product) {
    product.pictureUrl = product.picture
      ? `${req.protocol}://${req.get("host")}/images/${product.picture}`
      : null;
  }
  res.json(product);
  } catch (error) {
    res.json("error")
  }

};

exports.create = async (req, res) => {
  // Use upload.single middleware to handle file upload
  upload.single('picture')(req, res, async (err) => { 
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { category_id, name, price, description, unit_in_stock } = req.body;
    const picture = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
      const product = await prisma.product.create({
        data: {
          category_id: parseInt(category_id),
          name,
          price: parseFloat(price),
          description,
          unit_in_stock: parseInt(unit_in_stock),
          picture, // Store filename in the database
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};


exports.update = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { id } = req.params;
    const { category_id, name, price, description, unit_in_stock } = req.body;
    const picture = req.file ? req.file.filename : null;
    
    try {
      const product = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          category_id: parseInt(category_id),
          name,
          price: parseFloat(price),
          description,
          unit_in_stock: parseInt(unit_in_stock),
          picture, // Update filename if a new file is uploaded
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

exports.orderBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const product = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { Category: true },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

exports.filter = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    if (query) {
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        include: {
          Category: true,
        },
      });
      res.json(products);
    }
    if (category) {
      const products = await prisma.product.findMany({
        where: {
          category_id: {
            in: category.map((id) => Number(id)),
          },
        },
        include: {
          Category: true,
        },
      });
      res.json(products);
    }
    if (price) {
      const products = await prisma.product.findMany({
        where: {
          price: {
            gte: price[0],
            lte: price[1],
          },
        },
        include: {
          Category: true,
        },
      });
      res.json(products);
    }
  } catch (error) {
    res.json("Server Error");
  }
};

exports.stock = async (req, res) => {
  const { stock } = req.params;
  const stockk = await prisma.product.findMany({
    where: {
      unit_in_stock: {
        lte: parseInt(stock),
      },
    },
  });
  res.json(stockk);
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Store files in the 'images' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });
