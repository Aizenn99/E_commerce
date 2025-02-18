const Product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    // Convert category and brand into arrays
    let Filters = {};
    if (category) {
      Filters.category = { $in: category.split(",") };
    }
    if (brand) {
      Filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort = { salePrice: 1 };
        break;
      case "price-hightolow":
        sort = { salePrice: -1 };
        break;
      case "title-atoz":
        sort = { title: 1 };
        break;
      case "title-ztoa":
        sort = { title: -1 };
        break;
      default:
        sort = { price: 1 };
        break;
    }

    const products = await Product.find(Filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "error not found",
      });

    res.status(200).json({
      suceess: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts ,getProductDetails};
