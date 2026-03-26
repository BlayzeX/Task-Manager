    let xp = 0;
    const maxXp = 500;
    let level = 0;
    function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    const completedTask = document.getElementById('completedTask');
    const emptyTwo = document.getElementById('empty-two'); 
    if (text === '') return;

    const div = document.createElement('div');
    div.className = 'div';

    const li = document.createElement('li');
    li.textContent = text;
    li.className = 'li';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';

    checkBox.addEventListener('change', function() {
        if (checkBox.checked) {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
            completedTask.appendChild(div);
            if(xp < 500){
            xp += 250;
            updateXp();
            if(xp === 500){
            xp =0;
            level += 1;
            let levelUp = document.getElementById('level');
            levelUp.textContent = level;
            }
        } else {
            li.style.textDecoration = 'none';
            li.style.opacity = '1';
            taskList.appendChild(div);
        }
        if (taskList.children.length === 1) {
            document.getElementById('empty').style.display = 'block';
        }
        emptyTwo.style.display = 'none';
    }});

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'deleteBtn';

    deleteBtn.onclick = function() {
        div.remove();
        if (taskList.children.length === 1) {
            document.getElementById('empty').style.display = 'block';
        }
        if (completedTask.children.length === 1) {
            emptyTwo.style.display = 'block';
        }
    };

    div.appendChild(checkBox);
    div.appendChild(li);
    div.appendChild(deleteBtn);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(div);

    document.getElementById('empty').style.display = 'none';
    input.value = '';
}
document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
function updateXp(){
    const bar = document.getElementById('green-progress');
    const text = document.getElementById('xpText');
    const percent = (xp / maxXp) * 100;
    bar.style.width = percent + "%";
    text.textContent = "XP" + " " + xp + "/" + "500";
    if(xp >= 500) return;
}

