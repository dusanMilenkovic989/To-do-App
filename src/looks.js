import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'  

const renderNotes = () => {
    const toDoList = getTodos()
    const { searchText, hideCompleted} = getFilters()

    const filteredNotes = toDoList.filter((item) => {
        const searchTextMatch = item.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !item.completed
        
        return searchTextMatch && hideCompletedMatch                  
    })

    const toDoIncompleted = filteredNotes.filter((item) => !item.completed)
    const toDosPlace = document.querySelector('#summary-and-todos-div')

    toDosPlace.innerHTML = ''
    toDosPlace.appendChild(summary(toDoIncompleted))

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((todoInside) => {
            toDosPlace.appendChild(generateTodoDom(todoInside))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'Anything to do yet?!'
        toDosPlace.appendChild(emptyMessage)
    }
}

const generateTodoDom = (todoItem) => {
    const toDoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const paragraphs = document.createElement('span')
    const button = document.createElement('button')

    // Checkbox setup + append
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todoItem.completed                            
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {                     
        toggleTodo(todoItem.id)
        renderNotes()                                 
    })                                                                
    
    // Parag/Span text change + append
    if (todoItem.text.length > 0) {
        paragraphs.textContent = todoItem.text
    } else {
        paragraphs.textContent = 'Undefined to do'
    }
    containerEl.appendChild(paragraphs)

    // Container setup + append
    toDoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    toDoEl.appendChild(containerEl)

    // Button setup + append
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    toDoEl.appendChild(button)
    button.addEventListener('click', () => {
        removeTodo(todoItem.id)
        renderNotes()
    })
     
    return toDoEl
}

const summary = (incompleteTodos) => {
    const firstP = document.createElement('h2')
    const plural = incompleteTodos.length !== 1 ? 's' : ''

    firstP.classList.add('list-title')
    firstP.textContent = `You have ${incompleteTodos.length} thing${plural} to do:`

    return firstP
}

export { renderNotes, generateTodoDom, summary }