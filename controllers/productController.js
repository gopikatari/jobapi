const Product = require('../models/Product');

const getAllProducts = async (req, res, next) => {
  let queryObj = {};

  const {
    featured,
    company,
    name,
    sort,
    fields,
    page = 1,
    limit = 10,
    numericFilters,
  } = req.query;

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '=': '$eq',
      '>': '$gt',
      '>=': '$gte',
      '<=': '$lte',
      '<': '$lt',
    };
    const regex = /\b(>|<|=|>|>=|<=)\b/g;
    const options = ['rating', 'price'];
    const filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    filters.split(',').map((item) => {
      const [field, symbol, value] = item.split('-');
      queryObj[field] = { [symbol]: Number(value) };
    });
  }

  let result = Product.find(queryObj);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result.sort('createdAt');
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result.select(fieldList);
  }

  //sorting
  const skip = (Number(page) - 1) * Number(limit);
  result = result.skip(skip).limit(limit);
  //sorting

  console.log(queryObj);
  const products = await result;

  await res.status(200).json({
    nbHits: products.length,
    result: products,
  });
};

const getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;
  res.status(200).json({
    result: 'retriving single product',
  });
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  res.status(200).json({
    result: 'deleting  product',
  });
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log(req.body);
  res.status(200).json({
    result: 'updating  product',
  });
};
const createProduct = async (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    result: 'creating  product',
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
};
