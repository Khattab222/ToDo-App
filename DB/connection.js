import mongoose from "mongoose";

export const  connectionDb =async () => {
  return await mongoose
  .connect(`mongodb://127.0.0.1:27017/assignment8 `)
  .then(() => console.log("Db connecting success..... "))
  .catch((err) => console.log({message:'connection fail' , err}))
}


mongoose.set('strictQuery', false);
