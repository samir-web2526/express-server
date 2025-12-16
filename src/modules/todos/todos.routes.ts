import express from 'express';
import { todosCollections } from './todos.controller';

const router = express.Router();

router.post('/',todosCollections.createTodos);
router.get('/',todosCollections.getTodos);
router.get('/:id',todosCollections.getSingleTodos);
router.put('/:id',todosCollections.updateTodos);
router.delete('/:id',todosCollections.deleteTodos);

export const todosRoutes = router;