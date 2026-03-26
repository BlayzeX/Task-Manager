// Get input value and create a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

        // Stop if input is empty
    if (text === '') return;
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task-check';
    const div = document.createElement('div');
    div.className ='task-item';
    // Create the task element
    const li = document.createElement('li');
    li.textContent = text;
    li.className = 'task-text';

    // Hide the empty state message
    document.getElementById('emptyState').style.display = 'none';

    // Create delete button for this task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'task-delete';

    // Delete this task when button is clicked
    deleteBtn.onclick = function() {
        div.remove();

        // Show empty message if no tasks left
        const taskList = document.getElementById('taskList');
        if (taskList.children.length === 1) {
            document.getElementById('emptyState').style.display = 'block';
        }
        
    };
    div.appendChild(checkBox);
    div.appendChild(li);
    div.appendChild(deleteBtn);

    // Add task to the list
    document.getElementById('taskList').appendChild(div);

    // Clear the input
    input.value = '';
}
document.getElementById('taskInput').addEventListener('keydown', function(e){
    if(e.key === 'Enter') {
        addTask();
    }
});
// Remove all tasks at once
function clearDone() {
    const tasks = document.querySelectorAll('#taskList .task-item');
    tasks.forEach(task => task.remove());

    // Show empty message
    document.getElementById('emptyState').style.display = 'block';
}
