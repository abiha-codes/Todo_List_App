const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");
const clearAll = document.getElementById("clearAll");

// Add Task
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
        updateCount();
    }
}

// Check / Delete Task
listContainer.addEventListener("click", function (e) {

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateCount();
    }

}, false);

// Save Tasks
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load Tasks
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateCount();
}

// Task Counter
function updateCount() {
    const total = document.querySelectorAll("#list-container li").length;
    taskCount.innerHTML = `${total} Task${total !== 1 ? "s" : ""}`;
}

// Enter Key Support
inputBox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Clear All Tasks
clearAll.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
        updateCount();
    }

});

// Load Saved Tasks
showTask();