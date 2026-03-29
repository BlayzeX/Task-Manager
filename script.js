let data = JSON.parse(localStorage.getItem('data')) || {
    tasks: [],
    level: 0,
    xp: 0
};
let tasks = data.tasks;
let xp = data.xp;
const maxXp = 500;
let level = data.level;

function saveData() {
    localStorage.setItem('data', JSON.stringify({
        tasks: tasks,
        xp: xp,
        level: level
    }));
}

function updateXp() {
    const bar = document.getElementById('green-progress');
    const text = document.getElementById('xpText');
    const percent = (xp / maxXp) * 100;
    bar.style.width = percent + '%';
    text.textContent = 'XP ' + xp + '/500';
}

function checkEmpty() {
    const taskList = document.getElementById('taskList');
    const completedTask = document.getElementById('completedTask');
    const empty = document.getElementById('empty');
    const emptyTwo = document.getElementById('empty-two');

    const activeTasks = tasks.filter(function(t) { return !t.completed; });
    const doneTasks = tasks.filter(function(t) { return t.completed; });

    empty.style.display = activeTasks.length === 0 ? 'block' : 'none';
    emptyTwo.style.display = doneTasks.length === 0 ? 'block' : 'none';
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const completedTask = document.getElementById('completedTask');

    const div = document.createElement('div');
    div.className = 'div';

    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = 'li';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    checkBox.checked = task.completed;

    if (task.completed) {
        li.style.textDecoration = 'line-through';
        li.style.opacity = '0.5';
    }

    checkBox.addEventListener('change', function() {
        if (checkBox.checked) {
            task.completed = true;
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
            completedTask.appendChild(div);
            if (xp < 500) {
                xp += 50;
            }
            if (xp >= 500) {
                xp = 0;
                level += 1;
                document.getElementById('level').textContent = level;
            }
            updateXp();
        } else {
            task.completed = false;
            li.style.textDecoration = 'none';
            li.style.opacity = '1';
            taskList.appendChild(div);
        }
        checkEmpty();
        saveData();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'deleteBtn';

    deleteBtn.onclick = function() {
        tasks = tasks.filter(function(t) { return t !== task; });
        div.remove();
        checkEmpty();
        saveData();
    };

    div.appendChild(checkBox);
    div.appendChild(li);
    div.appendChild(deleteBtn);

    if (task.completed) {
        completedTask.appendChild(div);
    } else {
        taskList.appendChild(div);
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text === '') return;

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    saveData();
    renderTask(task);
    input.value = '';
    checkEmpty();
}

document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

tasks.forEach(function(task) {
    renderTask(task);
});

checkEmpty();
updateXp();
document.getElementById('level').textContent = level;
