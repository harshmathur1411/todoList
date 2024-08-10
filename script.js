const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Function to add a new to-do to the list
function addTodoToList(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    todoList.appendChild(li);
}

// Add event listener to the "Add To-Do" button
addTodoButton.addEventListener('click', () => {
    const newTodo = {
        title: todoInput.value,
        completed: false
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        addTodoToList(data); // Add the new to-do item to the list
        todoInput.value = ''; // Clear the input field
    })
    .catch(error => console.error('Error:', error));
});

// Load existing to-dos on page load
window.addEventListener('load', () => {
    fetch(apiUrl + '?_limit=5')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => addTodoToList(todo));
        })
        .catch(error => console.error('Error:', error));
});
