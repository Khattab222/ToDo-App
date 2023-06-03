import Joi from "joi";



export const signupValidationSchema = {
    body:Joi.object().required().keys({
        name:Joi.string().max(10).min(5).alphanum().required().messages({'string.min':'name must be between 5 and 10 characters','string.empty':'name required'}),
        email:Joi.string().email().required().messages({'string.email':'email format invalid','string.empty':'email required'}),
        password:Joi.string().required().messages({'string.empty':'password required'}),
        cpass:Joi.string().valid(Joi.ref('password')).messages({'any.only':'password and cpass not match'}),
        age:Joi.number().max(100).min(10).messages({'number.min':'age must be between 10 and 100 ','number.max':'age must be between 10 and 100 '})
    })
}

export const loginValidationSchema = {
    body:Joi.object().required().keys({
        email:Joi.string().email().required().messages({'string.email':'email format invalid','string.empty':'email required'}),
        password:Joi.string().required().messages({'string.empty':'password required'}),
    })
} 