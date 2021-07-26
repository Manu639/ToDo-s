<<<<<<< HEAD
localStorage.setItem('tasks', JSON.stringify(tasksList))
=======
/*                     <div class="task">
                            <p>Nombre</p>
                            <p>Modelo</p>
                            <p> Fecha</p>
                            <p>Comentario</p>
                            <p><i class="fas fa-trash-alt"></i></p>
                        </div> --> */
>>>>>>> feature_localStorage
let taskArea = document.querySelector('.taskArea');


/* Events */

let filterInput = document.querySelector('#searchBox')
filterInput.addEventListener('input', textFilter)

function textFilter(event) {
    event.preventDefault();
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    taskArea.innerHTML = "";
    let word = event.target.value;
    let filteredList = searchWord(word, actualTasksList);
    printTasks(filteredList)
}

let headerButtons = document.querySelectorAll('header .btn-group button');
headerButtons.forEach(button => button.addEventListener('click', captureRelevance))

function captureRelevance(event) {
    let relevance = event.target.value
    actualTasksList = JSON.parse(localStorage.getItem('tasks'))
    filterRelevance(relevance, actualTasksList)
}

function deleteTask(event) {
    let id = parseInt(event.target.dataset.id)
    let indexTaskToDelete = tasksList.findIndex(task => task.idTask === id)
    tasksList.splice(indexTaskToDelete, 1)
    console.log(tasksList)
    taskArea.innerHTML = "";
    printTasks(tasksList)
}

let addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener('click', addTask)

function addTask(event) {
    event.preventDefault();
    let newCompanyName = document.querySelector('#companyName');
    let newDueDate = document.querySelector('#dueDate');
    let newTaxType = document.querySelector('#taxType');
    let newRelevance = document.querySelector('div.btn-group>input:checked')
    let newComment = document.querySelector('#comments')

    newTask = {
        idTask: Math.floor(Math.random() * 1001),
        company: newCompanyName.value,
        taxType: newTaxType.value,
        dueDate: newDueDate.value,
        relevance: newRelevance.value,
        comment: newComment.value,
    }
    tasksList.push(newTask)
    printTask(newTask)

    newCompanyName.reset()
    newDueDate.reset()
    newTaxType.reset()
    newRelevance.reset()
    newComment.reset()

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
    printTasks(filteredList);
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

    taskArea.appendChild(div)
}
/* End Print Functions */

printTasks(tasksList)