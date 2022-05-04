import { v4 as uuidv4 } from 'uuid'

let toDoList = []

const loadTodos = () => {
    const todoSaved = localStorage.getItem('todo')

    try {
        toDoList = todoSaved ? JSON.parse(todoSaved) : []                             
    } catch (e) {
        toDoList = []
    }
}

const saveTodos = () => {
    localStorage.setItem('todo', JSON.stringify(toDoList))
}

const getTodos = () => toDoList

const createTodo = (text) => {
    if (text.length > 0) {
        toDoList.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveTodos()
    }
}

const removeTodo = (id) => {
    const todoIndex = toDoList.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        toDoList.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todo = toDoList.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    } 
}

loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }