(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/components/tasksView.js
  var require_tasksView = __commonJS({
    "lib/components/tasksView.js"(exports, module) {
      var TaskView2 = class {
        constructor(api2, model2) {
          this.api = api2, this.model = model2;
          this.body = document.querySelector("body");
          this.containerEL = document.querySelector("#testBox");
          this.move = false;
          this.taskCounter = 0;
          this.divName;
          this.#setTasks();
          this.textInputEL = document.querySelector("#tasks-input");
          this.addTaskEL = document.querySelector("#add-task");
          this.addTaskEL.addEventListener("click", () => {
            this.api.saveData(this.textInputEL.value);
            this.createTask(this.textInputEL.value);
          });
        }
        createTask(text) {
          this.taskCounter += 1;
          const div = document.createElement("div");
          div.textContent = text;
          div.draggable = true;
          div.className = "tasks";
          div.id = `task${this.taskCounter}`;
          div.addEventListener("dragstart", this.#dragStart);
          this.containerEL.append(div);
          this.textInputEL.value = "";
        }
        displayAllTasks() {
          for (const e of this.model.allTasks()) {
            this.createTask(e.description);
          }
        }
        #setTasks() {
          this.api.loadData((Response) => {
            this.model.setTasks(Response);
            this.displayAllTasks();
          });
        }
        #dragStart(e) {
          console.log(e.dataTransfer.setData("text/plain", e.target.id));
          e.dataTransfer.setData("text/plain", e.target.id);
          setTimeout(() => {
            e.target.classList.add("hide");
          }, 0);
        }
      };
      module.exports = TaskView2;
    }
  });

  // lib/tasksApi.js
  var require_tasksApi = __commonJS({
    "lib/tasksApi.js"(exports, module) {
      var TasksAPi = class {
        loadData(callback) {
          fetch("http://localhost:3000/tasks").then((response) => response.json()).then((response_json) => callback(response_json));
        }
        saveData(input) {
          const input_data = { data: input };
          fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(input_data)
          }).then((response) => console.log(response));
        }
      };
      module.exports = TasksAPi;
    }
  });

  // lib/tasksModel.js
  var require_tasksModel = __commonJS({
    "lib/tasksModel.js"(exports, module) {
      var TasksModel = class {
        constructor() {
          this.tasks = [];
        }
        setTasks(tasks_array) {
          this.tasks = tasks_array;
        }
        allTasks() {
          return this.tasks;
        }
      };
      module.exports = TasksModel;
    }
  });

  // lib/components/dropboxView.js
  var require_dropboxView = __commonJS({
    "lib/components/dropboxView.js"(exports, module) {
      var DropBoxesView = class {
        constructor() {
          this.boxes = document.querySelectorAll(".box");
          this.setBoxEvents();
        }
        setBoxEvents() {
          this.boxes.forEach((box) => {
            box.addEventListener("dragenter", this.dragEnter);
            box.addEventListener("dragover", this.dragOver);
            box.addEventListener("dragleave", this.dragLeave);
            box.addEventListener("drop", this.drop);
          });
        }
        dragEnter(e) {
          e.preventDefault();
          e.target.classList.add("drag-over");
        }
        dragOver(e) {
          e.preventDefault();
          e.target.classList.add("drag-over");
        }
        dragLeave(e) {
          e.target.classList.remove("drag-over");
        }
        drop(e) {
          e.target.classList.remove("drag-over");
          const id = e.dataTransfer.getData("text/plain");
          console.log(id);
          const draggable = document.getElementById(id);
          e.target.appendChild(draggable);
          draggable.classList.remove("hide");
        }
      };
      module.exports = DropBoxesView;
    }
  });

  // index.js
  var TaskView = require_tasksView();
  var Api = require_tasksApi();
  var Model = require_tasksModel();
  var DropBoxView = require_dropboxView();
  var api = new Api();
  var model = new Model();
  var tasksView = new TaskView(api, model);
  var dropboxView = new DropBoxView();
})();
