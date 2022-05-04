import { renderNotes } from './looks'
import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'

renderNotes()

document.querySelector('#input2').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#new-to-do').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.toDoSubmiter.value.trim()
    createTodo(text)
    renderNotes()
    e.target.elements.toDoSubmiter.value = ''
})

document.querySelector('#check').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })                             
    renderNotes()                                          
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todo') {
        loadTodos()
        renderNotes()
    }
})