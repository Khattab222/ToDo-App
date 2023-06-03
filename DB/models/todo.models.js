import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      
    },

    desc: String,
    status: {type:String,default:'pending'},
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
  },
  {
    timestamps: true,
  }
);
const todoModel = mongoose.model('Todo' , todoSchema);
export default todoModel;
