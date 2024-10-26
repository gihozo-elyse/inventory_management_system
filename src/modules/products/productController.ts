import productRepositories from "../../Repositories/productRepository/productRepositories";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { validateMongoDbID } from "../../helper/validateMongodbID";
import { logEvent } from "../../middlewares/EventLog";

const addNewProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await productRepositories.addProduct(req.body);
    await logEvent("Added", newProduct._id.toString());
    res
      .status(httpStatus.CREATED)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the product." });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const pagination = {
      skip,
      limit,
    };
    const products = await productRepositories.getAllProducts(pagination);
    res
      .status(httpStatus.OK)
      .json({
        message: "Products fetched successfully",
        data: {
          total: products.total,
          page,
          totalPage: Math.ceil(products.total / limit),
          products:products.products,
        },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving products." });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    validateMongoDbID(req.params.id);
    const updatedProduct = await productRepositories.updateProduct(
      req.params.id,
      req.body.quantity
    );
    await logEvent("Updated", req.params.id);
    res
      .status(httpStatus.OK)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the product quantity.",
      });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    validateMongoDbID(req.params.id);
    const product = await productRepositories.getProductById(req.params.id);
    if (!product)
      res.status(httpStatus.NOT_FOUND).json({ message: "Product not found" });
    res
      .status(httpStatus.OK)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    validateMongoDbID(req.params.id);
    await productRepositories.deleteProduct(req.params.id);
    await logEvent("Deleted", req.params.id);
    res
      .status(httpStatus.NO_CONTENT)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product." });
  }
};
export {
  addNewProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
