import { checkQuantityBeforeDelete, isProductExist,validateQuantity } from "../middlewares/validation";
import * as productController from "../modules/products/productController";
import { Router } from "express";

const router: Router = Router();

router.post('/add-product',isProductExist, productController.addNewProduct);
router.get('/get-products', productController.getAllProducts);
router.get('/get-product/:id', productController.getProductById);
router.put('/update-product/:id',validateQuantity, productController.updateProduct);
router.delete('/delete-product/:id',checkQuantityBeforeDelete, productController.deleteProduct);

export default router;