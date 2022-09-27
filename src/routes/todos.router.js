const express = require('express')

const TodoRouter = express.Router()
const {getAllTodos, createTodo, getTodo, updateTodo, deleteTodo, searchTodos} = require('../controllers/todos.controller')

TodoRouter.route('/search').get(searchTodos)
TodoRouter.route('/').get(getAllTodos).post(createTodo)
TodoRouter.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)

module.exports = TodoRouter;