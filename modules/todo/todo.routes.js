import { Router } from 'express';
import * as todo_controller from './todo.controller.js'
import { auth } from './../../middlewares/authintication.js';

import { addTodoSchema } from './todo.validation.js';
import { validation } from '../../middlewares/validation.js';


const router = Router()

// add to do with authourization and validation
router.post('/add',auth(),validation(addTodoSchema),todo_controller.addTodo);
router.put('/update/:todoId',auth(),validation(addTodoSchema), todo_controller.updateTodo)
router.delete('/:todoId',auth(),todo_controller.deleteTodo )
router.get('/',auth(),todo_controller.getAllTodos);
router.put('/status',auth(),todo_controller.changeStatusTodo);
router.delete('/',auth(),todo_controller.deleteAllTodo)
router.get('/search',auth(),todo_controller.searchTodos)





export default router
