/*                     <div class="task">
                            <p>Nombre</p>
                            <p>Modelo</p>
                            <p> Fecha</p>
                            <p>Comentario</p>
                            <p><i class="fas fa-trash-alt"></i></p>
                        </div> --> */


let taskArea = document.querySelector('.taskArea')


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

printTasks(tasksList)