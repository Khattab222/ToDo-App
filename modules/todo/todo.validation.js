import Joi from "joi"


export const addTodoSchema = {
    body:Joi.object().required().keys({
        title:Joi.string().min(5).max(15).required().messages({'string.empty':'title required','string.min':'title must be more than 5 charchter','string.max':'title must be less than 15 charcter'}),
        desc:Joi.string().required().messages({'string.empty':'desc  required'}),
    })
} 