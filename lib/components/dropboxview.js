class DropBoxesView{

  constructor(){
    this.boxes = document.querySelectorAll('.box');
    this.setBoxEvents()
  }

  setBoxEvents(){
  this.boxes.forEach(box => {
    box.addEventListener('dragenter', this.dragEnter)
    box.addEventListener('dragover', this.dragOver);
    box.addEventListener('dragleave', this.dragLeave);
    box.addEventListener('drop', this.drop);
});
  }

  dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

  dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

 dragLeave(e) {
    e.target.classList.remove('drag-over');
}

  drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    console.log(id)
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}


}

module.exports = DropBoxesView;