import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import productRepositories from "../Repositories/productRepository/productRepositories";
import { productModel } from "../Databases/model/productModel";

export const isProductExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productExits = await productRepositories.findProductByAttribute(
      "name",
      req.body.name
    );
    if (productExits) {
      res
        .status(httpStatus.CONFLICT)
        .json({ message: "Product already exists" });
    }
    next();
  } catch (error: any) {
    console.error(error.message);
  }
};

export const validateQuantity = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity } = req.body.quantity;
    const parsedQuantity = Number(quantity);
  
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
       res.status(400).json({ message: 'Quantity must be a non-negative number.' });
    }
    next();
  } catch (error:any) {
    console.error(error.message);
  }
};

export const checkQuantityBeforeDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
  
      const product = await productModel.findById(id);
  
      if (!product) {
         res.status(404).json({ message: 'Product not found.' });
      }
  
      if (Number(product?.quantity) > 0) {
         res.status(400).json({ message: 'Product cannot be deleted because its quantity is greater than 0.' });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while checking product quantity.' });
    }
  };