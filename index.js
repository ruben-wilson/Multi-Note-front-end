const TaskView = require('./lib/components/tasksView.js')
const Api = require('./lib/tasksApi.js')
const Model = require('./lib/tasksModel.js')
const DropBoxView = require('./lib/components/dropboxView.js')

const api = new Api
const model = new Model

const tasksView = new TaskView(api, model)
const dropboxView = new DropBoxView

/* drop targets */
// const boxes = document.querySelectorAll('.box');

// boxes.forEach(box => {
//     box.addEventListener('dragenter', dragEnter)
//     box.addEventListener('dragover', dragOver);
//     box.addEventListener('dragleave', dragLeave);
//     box.addEventListener('drop', drop);
// });


// function dragEnter(e) {
//     e.preventDefault();
//     e.target.classList.add('drag-over');
// }

// function dragOver(e) {
//     e.preventDefault();
//     e.target.classList.add('drag-over');
// }

// function dragLeave(e) {
//     e.target.classList.remove('drag-over');
// }

// function drop(e) {
//     e.target.classList.remove('drag-over');

//     // get the draggable element
//     const id = e.dataTransfer.getData('text/plain');
//     console.log(id)
//     const draggable = document.getElementById(id);

//     // add it to the drop target
//     e.target.appendChild(draggable);

//     // display the draggable element
//     draggable.classList.remove('hide');
// }
