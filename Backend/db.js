const mongoose = require("mongoose")
const { boolean } = require("zod")

mongoose.connect("mongodb+srv://DataBase1_Anurag:First1234@cluster0.gsrzw.mongodb.net/Todo-App")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema)

module.exports = {
    todo
}