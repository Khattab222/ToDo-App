
import  jwt  from "jsonwebtoken"


export const  tokkenFunction  =({
    payload="" || {},
    signature = process.env.TOKEN_SIGNATURE,
    method = 'sign' || 'verify'
}) =>{
    if (typeof payload == 'object') {
        if (Object.keys(payload).length && method ==  'sign') {
            const token  = jwt.sign(payload,signature);
            return token
        }
        return false
    }
    if (typeof payload == "string") {
        if (payload == "" || method != 'verify') {
         return false 
        }
        const decoded = jwt.verify(payload,signature);
        return decoded
       }

} 