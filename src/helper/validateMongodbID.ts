import mongoose from "mongoose";
export const validateMongoDbID = (id:string) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        throw new Error("this ID is not valid or not Found")
    }
};