import userModel from "../DB/models/user.models.js";
import { tokkenFunction } from "../utils/tokkenFunction.js";

// authorization function 
export const auth = () => {
  return async (req,res,next) => {
    try {
        const {authorization }= req.headers;
        if (!authorization) {
            return res.json({message:'please enter token '})
        }
        if (!authorization.startsWith(process.env.TOKEN_PRIFIX)) {
            return res.json({message:'wrong prefix'})  
        }
        const token = authorization.split('__')[1];
        const decoded = tokkenFunction({payload:token,method:'verify'});
      if (!decoded || !decoded.id) {
return res.json({message:'invalid token payload'})      }
const user = await userModel.findById(decoded.id);
if (!user) {
    return res.json({message:'this user is not sxist any more'}) 
}
req.user= user;
next()
      
    } catch (error) {
        console.log(error);
        res.json({message:'catch error in authintication'})
    }
  }
  
}
