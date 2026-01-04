document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Use the optional 'save' parameter set to false to avoid duplication
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // If taskText is not provided (e.g., button click), get it from the input field
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if taskText is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // --- Task Creation ---
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Handle task removal
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // --- Local Storage Update ---
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = "";
    }

    // Helper function to remove task from Local Storage
    function removeTaskFromStorage(taskTextToRemove) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task that matches the text
        storedTasks = storedTasks.filter(task => task !== taskTextToRemove);
        // Save the updated list back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // --- Event Listeners ---
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize the app by loading tasks
    loadTasks();
});
