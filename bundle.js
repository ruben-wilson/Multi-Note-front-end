(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/tasksView.js
  var require_tasksView = __commonJS({
    "lib/tasksView.js"(exports, module) {
      var TaskView = class {
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
      module.exports = TaskView;
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

  // index.js
  var View = require_tasksView();
  var Api = require_tasksApi();
  var Model = require_tasksModel();
  var api = new Api();
  var model = new Model();
  var tasksView = new View(api, model);
  var tasks = document.querySelectorAll(".tasks");
  tasks.forEach((task) => {
    task.addEventListener("dragstart", dragStart);
  });
  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  }
  var boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", drop);
  });
  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }
  function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }
  function dragLeave(e) {
    e.target.classList.remove("drag-over");
  }
  function drop(e) {
    e.target.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    console.log(id);
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
    draggable.classList.remove("hide");
  }
})();
