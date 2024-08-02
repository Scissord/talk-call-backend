import * as Product from "../models/product.js"

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { products, lastPage } = await Product.get(limit, page, search);

		res.status(200).send({ products, lastPage });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send({ product });
  }  catch (err) {
    console.log("Error in create product controller", err.message);
    res.status(400).send({ error: "Invalid request payload" });
  }
};

export const softDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.softDelete(id);
    res.status(200).send({ message: `Successfully deleted, product_id = ${id}` });
  }  catch (err) {
    console.log("Error in delete product controller", err.message);
    res.status(400).send({ error: "Invalid request payload" });
  }
}
