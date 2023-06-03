import todoModel from "../../DB/models/todo.models.js";


 // add todo
export const addTodo =async (req,res,next) => {
  try {
    const {title,desc} = req.body;
    const {_id} = req.user;
    const newtodo =  new todoModel({title,desc,createdBy:_id });
    const savedtodo =await newtodo.save()
  if (savedtodo) {
      res.json({message:'adding success', data:savedtodo })
  }else{
    res.json({message:'adding fail' })

  }

  } catch (error) {
    console.log(error);
    res.json({message:'catch error in add todo' , error})
  }
}

// update todo
export const updateTodo =async (req,res,next) => {
  try {
    const {todoId} = req.params;
    const {title,desc} = req.body;
    const {_id} = req.user;
    const existTodo = await todoModel.findById({_id:todoId})
    if (existTodo) {
        if(String(existTodo.createdBy) == String(_id) ){
            const updatedTodo = await todoModel.findByIdAndUpdate(todoId,{title,desc},{new:true});
         if (updatedTodo) {
            res.json({message:'update success' ,data:updatedTodo})

         } else {
            res.json({message:'update fail' })
            
         }
        }else{
            res.json({message:'user only can update' })

        }
    } else {
        res.json({message:'invalid todo id'})
    }
  } catch (error) {
    console.log(error);
    res.json({message:'catch error in update todo' , error})
  }
}

// detele todo 
export const deleteTodo =async (req,res,next) => {
    try {
      const {todoId} = req.params;
      const {_id} = req.user;
      const existTodo = await todoModel.findById(todoId)
      if (existTodo) {
          if(String(existTodo.createdBy) == String(_id) ){
              const deleteTodo = await todoModel.findOneAndDelete(todoId);
           if (deleteTodo) {
              res.json({message:'delete success' })
  
           } else {
              res.json({message:'delete fail' })
              
           }
          }else{
            res.json({message:'user only can delete' })

          }
      } else {
          res.json({message:'invalid todo id'})
      }
    } catch (error) {
      console.log(error);
      res.json({message:'catch error in delete todo' , error})
    }
  }

  // get all todos for login user
  export const getAllTodos = async (req,res) => {
    try {
        const {_id} = req.user;
        const todos = await todoModel.find({createdBy:_id});
        if (todos) {
          res.json({message:'success', data:todos})
        }else{
          res.json({message:'there in no todos'})

        }
        
    } catch (error) {
        console.log(error);
        res.json({message:'catch error in getall todo' , error})
    }
  }

  // change status 
  export const changeStatusTodo =async (req,res,next) => {
    try {
      const {id} = req.query;
  
      const {_id} = req.user;

        const findtodos = await todoModel.find({_id:{$in:[...id.split(",")]},createdBy:_id});
        if(findtodos){
            const existTodo = await todoModel.updateMany({_id:{$in:[...id.split(",")]}},{$set: {status: "completed"}},{new:true});
      
              if (existTodo.modifiedCount) {
                 res.json({message:'update success'})
              } else {
                  res.json({message:'invalid fail'})
              }
        }else{
            res.json({message:'invalid id'})
        }

   
    } catch (error) {
      console.log(error);
      res.json({message:'catch error in chabge status todo' , error})
    }
  }

  // delete all todos 
  export const deleteAllTodo =async (req,res,next) => {
    try {
      const {id} = req.query;
  
      const {_id} = req.user;

        const findtodos = await todoModel.find({_id:{$in:[...id.split(",")]},createdBy:_id});
        if(findtodos){
          
            const deletetodos = await todoModel.remove();
          
      console.log(deletetodos.deletedCount)
              if (deletetodos.deletedCount) {
                 res.json({message:'delete success'})
              } else {
                  res.json({message:'invalid fail'})
              }
        }else{
            res.json({message:'invalid id'})
        }

   
    } catch (error) {
      console.log(error);
      res.json({message:'catch error in delete many  todo' , error})
    }
  }

  // search todos
  export const searchTodos = async (req,res) => {
    try {
        const {search} = req.query
        // const {_id} = req.user;
        const todos = await todoModel.find({title:{$regex:`^${search}`}});
        if (todos) {
          res.json({message:'success', data:todos})
        }else{
          res.json({message:'there in no todos'})

        }
        
    } catch (error) {
        console.log(error);
        res.json({message:'catch error in search todo' , error})
    }
  }

  

