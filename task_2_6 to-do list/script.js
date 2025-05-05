document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector(".taskInput");
    const addTaskBtn = document.querySelector(".addTask");
    const taskList = document.querySelector(".taskList");
    const clearBtn = document.querySelector(".clear-btn");
    let currentEditingTask = null;

    function hasTasksInStorage() {
        const tasks = localStorage.getItem("tasks");
        return tasks && JSON.parse(tasks).length > 0;
    }

    function loadTasks() {
        if (hasTasksInStorage()) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(task => {
                const taskItem = createTaskElement(task.text, task.completed);
                taskList.appendChild(taskItem);
            });
        }
    }

    function saveTasks() {
        const tasks = [...taskList.children].map(taskItem => {
            const textElement = taskItem.querySelector(".task-text") || taskItem.querySelector(".edit-textarea");
            return {
                text: textElement ? textElement.textContent || textElement.value : "",
                completed: taskItem.querySelector("input").checked
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createCheckbox(completed, taskItem) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("custom-checkbox");
        checkbox.checked = completed;

        checkbox.addEventListener("change", () => {
            if (taskItem.classList.contains("editing")) {
                checkbox.checked = !checkbox.checked;
                return;
            }
            taskItem.classList.toggle("done", checkbox.checked);
            saveTasks();
        });

        return checkbox;
    }

    function createTextDiv(taskText) {
        const textDiv = document.createElement("div");
        textDiv.classList.add("task-text");
        textDiv.textContent = taskText;
        return textDiv;
    }

    function createTaskIcons(taskItem) {
        const taskIcons = document.createElement("div");
        taskIcons.classList.add("task-icons");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = '<img src="icons/edit-btn.png" alt="edit">';
        editBtn.addEventListener("click", () => editTask(taskItem));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<img src="icons/delete-btn.png" alt="delete">';
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        taskIcons.append(editBtn, deleteBtn);
        return taskIcons;
    }

    function createTaskElement(taskText, completed = false) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (completed) taskItem.classList.add("done");

        const checkbox = createCheckbox(completed, taskItem);
        const textDiv = createTextDiv(taskText);
        const taskIcons = createTaskIcons(taskItem);

        taskItem.append(checkbox, textDiv, taskIcons);
        return taskItem;
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText);
            taskList.prepend(taskItem);
            saveTasks();
            taskInput.value = "";
        }
    });

    function editTask(taskItem) {
        const textDiv = taskItem.querySelector(".task-text");
        const checkbox = taskItem.querySelector("input[type='checkbox']");

        if (currentEditingTask && currentEditingTask !== taskItem) {
            return
        }

        currentEditingTask = taskItem;
        taskItem.classList.add("editing");
        checkbox.disabled = true;

        const editTextarea = document.createElement("textarea");
        editTextarea.classList.add("edit-textarea");
        editTextarea.value = textDiv.textContent.trim();

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.innerHTML = '<img src="icons/save-btn.png" alt="save">';

        saveBtn.addEventListener("click", () =>
            closeEditingTask(taskItem)
        );

        taskItem.replaceChild(editTextarea, textDiv);
        taskItem.appendChild(saveBtn);
        editTextarea.focus();
        editTextarea.setSelectionRange(editTextarea.value.length, editTextarea.value.length);
    }

    function closeEditingTask(taskItem) {
        if (!taskItem.classList.contains("editing")) return;

        const editTextarea = taskItem.querySelector(".edit-textarea");
        const textDiv = document.createElement("div");
        textDiv.classList.add("task-text");
        textDiv.textContent = editTextarea.value.trim();

        const checkbox = taskItem.querySelector("input[type='checkbox']");
        checkbox.disabled = false;

        taskItem.replaceChild(textDiv, editTextarea);
        taskItem.querySelector(".save-btn").remove();
        taskItem.classList.remove("editing");
        currentEditingTask = null;
        saveTasks();

        const saveBtn = taskItem.querySelector(".save-btn");
        if (saveBtn) saveBtn.remove();

        taskItem.classList.remove("editing");
        currentEditingTask = null;
    }

    clearBtn.addEventListener("click", () => {
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
    });

    loadTasks();
});
