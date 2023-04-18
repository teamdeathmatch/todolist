

document.addEventListener("DOMContentLoaded", function () {
    var tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksArray.forEach(function (task) {
        var li = document.createElement("li");
        li.innerHTML = task;
        li.classList.add("list-group-item");
        document.getElementById("list").appendChild(li);
    });
    deleteEventItem();
});


function newElement() {
    var task = document.getElementById("task").value;

    if (task) {
        var li = document.createElement("li");
        li.innerHTML = `
        <span class="float-left">${task}</span><i class=" delete fa-solid fa-x float-right" style="color: #707070;"></i>
        `;

        li.classList.add("list-group-item");
        document.getElementById("list").appendChild(li);
        document.getElementById("task").value = "";
        showToast();
    } else {
        alertToast();
    }

    deleteEventItem();

    var tasks = document.querySelectorAll(".list-group-item");
    var tasksArray = [];
    tasks.forEach(function (task) {
        tasksArray.push(task.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        newElement();
    }
});

// Toast 
function showToast() {
    var toastEl = document.getElementById("add-task-toast");
    toastEl.classList.add("show");

    setTimeout(function () {
        toastEl.classList.remove("show");
    }, 3000);

}

function alertToast() {
    var toastAl = document.getElementById("alert-task-toast");
    toastAl.classList.add("show");

    setTimeout(function () {
        toastAl.classList.remove("show");
    }, 3000);

}

// Delete Button & silme ve LS 
function deleteEventItem() {
    var deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            var li = e.target.parentElement;
            var ul = li.parentElement;

            
            if (ul) {
                ul.removeChild(li);

                
                var tasks = document.querySelectorAll(".list-group-item");
                var tasksArray = [];
                tasks.forEach(function (task) {
                    tasksArray.push(task.innerHTML);
                });
                localStorage.setItem("tasks", JSON.stringify(tasksArray));
            }
        });
    });
}


