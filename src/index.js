const toDoListForm = document.querySelector(".toDoListForm"),
    input = toDoListForm.querySelector("#todo"),
    pendingList = document.querySelector(".toDoListPending"),
    finishedList = document.querySelector(".toDoListFinished");

const PEND = "PENDING";
const FINISHED = "FINISHED";

// ============= PENDING LIST ================

let listOfPending = [];

function ListFromInput(event) {
    event.preventDefault();
    const InputText = input.value;
    createList(InputText);
    input.value = "";
}

function createList (InputText) {
    const listId = listOfPending.length + 1;
    const innerText = InputText;
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.addEventListener("click",deleteList);
    finBtn.addEventListener("click",finList);
    delBtn.innerText ="❌";
    finBtn.innerText = "✔️";
    span.innerText = innerText;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = listId;
    pendingList.appendChild(li);

    const listIdToDo = {
        id : listId,
        text : innerText
    };
    listOfPending.push(listIdToDo);
    saveToDoInStorage(PEND,listOfPending);

}

function deleteList (e) {
    const btn = e.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanStorage = listOfPending.filter(function(task) {
        return task.id !== Number(li.id);
    });
    listOfPending = cleanStorage;
    saveToDoInStorage(PEND,listOfPending);
}

// =============== COMMON =============

function saveToDoInStorage(Key,listOF) {
    if (Key === PEND) {
        localStorage.setItem(Key,JSON.stringify(listOF))
    } else if (Key === FINISHED) {
        localStorage.setItem(Key,JSON.stringify(listOF))
    }
}

function loadListInfo(Key) {
    switch (Key) {
        case "PENDING" :
            const loadedInput = localStorage.getItem(Key);
            if (loadedInput !== null) {
                const parseInput = JSON.parse(loadedInput)
                parseInput.forEach(function(task) {
                    createList(task.text);
                });
            }
            break;
        case "FINISHED" :
            const loadedFinInput = localStorage.getItem(Key);
            if (loadedFinInput !== null) {
                const parseInput = JSON.parse(loadedFinInput)
                parseInput.forEach(function(task) {
                    createFinList(task.text);
                });
            }
            break;
        default :
            break;
    }
}

// ============= FINISHED LIST ================

let listOfFinished = [];

function finList (e) {
    // =========== del pending ================
    const btn = e.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanStorage = listOfPending.filter(function(task) {
        return task.id !== Number(li.id);
    });
    listOfPending = cleanStorage;
    saveToDoInStorage(PEND,listOfPending);
    // =========== del pending ================

    const span = li.querySelector("span");
    const textFromPend = span.innerText;
    createFinList(textFromPend);
}

function createFinList (text) {
    const listId = listOfFinished.length + 1;
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const upListBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteFinList);
    upListBtn.addEventListener("click",upFinList);
    delBtn.innerText ="❌";
    upListBtn.innerText = "⚠️";
    span.innerText = text;
    li.id = listId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(upListBtn);
    finishedList.appendChild(li);
    li.style.textDecoration = "line-through";

    const finListObj = {
        id : listId,
        text : text
    }
    listOfFinished.push(finListObj);
    saveToDoInStorage(FINISHED,listOfFinished)
}

function deleteFinList(e) {
    const btn = e.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinList = listOfFinished.filter(function(tasks) {
        return tasks.id !== Number(li.id);
    });
    listOfFinished = cleanFinList;
    saveToDoInStorage(FINISHED,listOfFinished);
}

function upFinList(e) {
    const btn = e.target;
    const li = btn.parentNode;
    const cleanFinList = listOfFinished.filter(function(task) {
        return li.id !== task.id;
    });
    listOfFinished = cleanFinList
    saveToDoInStorage(FINISHED,listOfFinished);
    const span = li.querySelector("span");
    createList(span.innerText);
    // =========== del finList ============
    deleteFinList(e);
}

function init() {
    toDoListForm.addEventListener("submit",ListFromInput);
    loadListInfo(PEND);
    loadListInfo(FINISHED);
}

init();