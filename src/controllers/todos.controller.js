const TodoModel = require('../models/Todo.model')
const {StatusCodes} = require('http-status-codes')

const getAllTodos = async (req, res) => {
    const todos = await TodoModel.find({})
    res.send(todos)
}

const createTodo = async (req, res) => {
    req.body.createdBy = req.user.userId
    const todo = await TodoModel.create(req.body)
    res.status(StatusCodes.CREATED).json({todo})
}

const getTodo = async (req, res) => {
    const todoId = req.params.id
    const todo = await TodoModel.findOne({_id:todoId})
    if (!todo) return res.send(`${todoId} not  found!`)
    res.status(StatusCodes.OK).send({todo})
}

const deleteTodo = async (req, res) => {
    const {user: {userId}} = req
    const todoId = req.params.id
    const todo = await TodoModel.findByIdAndDelete({_id: todoId, createdBy: userId})
    if (!todo) return res.send(`${todoId} not found!`)
    res.status(StatusCodes.OK).send()
}

const updateTodo = async (req, res) => {
    const {user: {userId}, body: {name}} = req
    const todoId = req.params.id
    if (name === '') return res.json({error: "Todo name is required"})
    const todo = await TodoModel.findByIdAndUpdate(
        {_id: todoId, createdBy: userId},
        req.body,
        {new: true, runValidators: true}
    )
    if (!todo) return res.json({error:"Can not update. Todo doesn't exists"})
    res.status(StatusCodes.OK).json({todo})
}

const searchTodos = async (req, res) => {
    const {query: {name, category, completed}} = req
    // if (category) return res.send(await TodoModel.find({category}))
    // if (completed != undefined) return res.send(await TodoModel.find({completed}))
    // res.send(await TodoModel.find())
    const todos = await TodoModel.fuzzy(name)
    if (category && completed != undefined) return res.send(todos.filter(res => res.document.category === category && res.document.completed==completed))
    if (category) return res.send(todos.filter(res => res.document.category === category))
    res.send(todos)
}

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
}