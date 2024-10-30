document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${task.title}</span>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id}, this.checked)">
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(listItem);
            });
        });
}

function addTask() {
    const title = document.getElementById('new-task').value;
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
    }).then(loadTasks);
}

function toggleTask(id, completed) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completed })
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(loadTasks);
}

