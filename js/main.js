/*                     <div class="task">
                            <p>Nombre</p>
                            <p>Modelo</p>
                            <p> Fecha</p>
                            <p>Comentario</p>
                            <p><i class="fas fa-trash-alt"></i></p>
                        </div> --> */

let taskFilter = document.querySelector('#taskFilter')
let taskArea = document.querySelector('.taskArea')


/* Events */

/* Search Event */
let filterInput = document.querySelector('#searchBox')
filterInput.addEventListener('input', textFilter)

function textFilter(event) {
    event.preventDefault();
    taskArea.innerHTML = "";
    let word = event.target.value;
    console.log(word)
    let filteredList = searchWord(word, tasksList);
    printTasks(filteredList)
}

/* End Search Event */


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

/* End Filter Functions */

/* Print Functions */
function printTasks(pList) {
    pList.forEach(task => printTask(task));
}

function printTask(pTask) {
    let div = document.createElement('div');

    div.classList = ('task')
    div.innerHTML = `<p>${pTask.company}</p>
                     <p>${pTask.taxType}</p>
                     <p> ${pTask.dueDate}</p>
                     <p>${pTask.comment}</p>
                     <p><i class="fas fa-trash-alt"></i></p>`

    taskArea.appendChild(div)
}
/* End Print Functions */

printTasks(tasksList)

searchWord('IVA', tasksList)