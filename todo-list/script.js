const STORAGE_KEY = "todoTasks";

function getSavedTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskItem(task) {
    const li = document.createElement("li");
    const taskLabel = document.createElement("span");
    taskLabel.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    li.appendChild(taskLabel);

    li.onclick = function () {
        li.classList.toggle("completed");
        updateStoredTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.onclick = function (event) {
        event.stopPropagation();
        li.remove();
        updateStoredTasks();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function updateStoredTasks() {
    const items = Array.from(document.querySelectorAll("#taskList li"));
    const tasks = items.map((li) => ({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
    }));
    saveTasks(tasks);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (!taskText) {
        taskInput.focus();
        return;
    }

    const task = { text: taskText, completed: false };
    createTaskItem(task);
    updateStoredTasks();

    taskInput.value = "";
    taskInput.focus();
}

function loadTasks() {
    const tasks = getSavedTasks();
    tasks.forEach(createTaskItem);
}

window.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskBtn").onclick = addTask;

