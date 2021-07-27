//Initializating localStorage
let localTasksList = (localStorage.getItem('tasks') === null) ? localStorage.setItem('tasks', JSON.stringify(tasksList)) : JSON.parse(localStorage.getItem('tasks'))
localTasksList = JSON.parse(localStorage.getItem('tasks'));

let taskArea = document.querySelector('.taskArea');
let filterInput = document.querySelector('#searchBox');
let headerButtons = document.querySelectorAll('header .btn-group input');
let addTaskButton = document.querySelector('#addTaskButton');
let pendingTasks = document.querySelector('#totalTasks')
let urgentTasks = document.querySelector('#totalUrgentTasks')

/* Formating date */
function formatDate(pObjectDate) {
    let dd = pObjectDate.getDate();
    let mm = pObjectDate.getMonth() + 1;
    let yyyy = pObjectDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    let formatedDate = dd + '/' + mm + '/' + yyyy;
    return formatedDate
}

/* Events */
filterInput.addEventListener('input', textFilter)

function textFilter(event) {
    event.preventDefault();
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    taskArea.innerHTML = "";
    let word = event.target.value;
    let filteredList = searchWord(word, actualTasksList);
    printTasks(filteredList)
}

headerButtons.forEach(button => button.addEventListener('click', captureRelevance))

function captureRelevance(event) {
    let relevance = event.target.value
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    filteredList = filterRelevance(relevance, actualTasksList)
    printTasks(filteredList)
}

function deleteTask(event) {
    let id = parseInt(event.target.dataset.id)
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    let indexTaskToDelete = actualTasksList.findIndex(task => task.idTask === id)
    actualTasksList.splice(indexTaskToDelete, 1)
    taskArea.innerHTML = "";
    localStorage.setItem('tasks', JSON.stringify(actualTasksList))
    pendingTasks.innerHTML = actualTasksList.length;
    urgentTasks.innerHTML = filterRelevance('high', actualTasksList).length;
    printTasks(actualTasksList)
}

addTaskButton.addEventListener('click', addTask)

function addTask(event) {
    event.preventDefault();
    let addTaskForm = document.querySelector('main>form');
    let newCompanyName = document.querySelector('#companyName');
    let newDueDate = document.querySelector('#dueDate');
    let newTaxType = document.querySelector('#taxType');
    let newRelevance = document.querySelector('div.btn-group>input:checked')
    let newComment = document.querySelector('#comments')

    newTask = {
        idTask: Math.floor(Math.random() * 1001),
        company: newCompanyName.value,
        taxType: newTaxType.value,
        dueDate: formatDate(new Date(newDueDate.value)),
        relevance: newRelevance.value,
        comment: newComment.value,
    }
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    actualTasksList.push(newTask)
    lastList = actualTasksList;
    localStorage.setItem('tasks', JSON.stringify(actualTasksList))
    printTask(newTask)
    pendingTasks.innerHTML = actualTasksList.length;
    addTaskForm.reset()

}
/* End Events */

/* Data Filter Functions */
function searchWord(pWord, pList) {

    let word = pWord.toLowerCase()
    let filteredList = []
    pList.forEach(element => {
        if (element.taxType.toLowerCase().includes(word) || element.company.toLowerCase().includes(word) || element.comment.toLowerCase().includes(word)) {
            filteredList.push(element)
        }
    })
    return filteredList
}

function filterRelevance(pRelevance, pList) {
    taskArea.innerHTML = "";
    let filteredList = new Array();
    pList.forEach(element => (element.relevance === pRelevance) ? filteredList.push(element) : "")
    return filteredList;
}

/* End Filter Functions */

/* Print Functions */
function printTasks(pList) {
    pList.forEach(task => printTask(task));
}

function printTask(pTask) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let i = document.createElement('i');
    div.classList = ('task')
    div.innerHTML = `<p>${pTask.company}</p>
                     <p>${pTask.taxType}</p>
                     <p> ${pTask.dueDate}</p>
                     <p>${pTask.comment}</p>`

    i.classList = ('fas fa-trash-alt')
    i.dataset.id = pTask.idTask
    i.addEventListener('click', deleteTask)
    p.appendChild(i);
    div.appendChild(p);
    let color
    switch (pTask.relevance) {
        case 'high':
            color = '#dc3545'
            break;
        case 'medium':
            color = 'darkorange'
            break;
        case 'low':
            color = '#198754'
            break;
    }
    div.style.borderLeft = `5px solid ${color}`
    div.style.borderRight = `5px solid ${color}`
    taskArea.appendChild(div)
}
/* End Print Functions */

pendingTasks.innerText = localTasksList.length;
urgentTasks.innerText = filterRelevance('high', localTasksList).length;
printTasks(localTasksList)