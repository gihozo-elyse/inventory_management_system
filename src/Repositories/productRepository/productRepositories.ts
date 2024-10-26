import { productModel } from "../../Databases/model/productModel";

interface IProduct {
    name: string;
    quantity: number;
    category: string;
}

interface IPagination {
    skip:number;
    limit:number;
}
const addProduct = async (body:IProduct) =>{
    const product = await productModel.create(body);
    return product
}

const updateProduct = async (id:string, quantity:any) =>{
    const updatedProduct = await productModel.findByIdAndUpdate(id, {quantity}, { new: true });
    return updatedProduct
}

const getAllProducts = async(pagination:IPagination)=>{
    const products = await productModel.find().skip(pagination.skip).limit(pagination.limit);
    const total = await productModel.countDocuments();
    return {products, total}
}

const getProductById = async (id:string) =>{
    const product = await productModel.findById(id);
    return product
}

const deleteProduct = async (id:string) =>{
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct
}

const findProductByAttribute = async(key: string, value:string) =>{
    const product = await productModel.findOne({[key]: value});
    return product
}

export default {
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    findProductByAttribute,
    deleteProduct
}