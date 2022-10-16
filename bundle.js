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
          this.move = false;
          this.taskCounter = 0;
          this.divName;
          this.tasksContainerEL = document.querySelector("#tasksContainer");
          this.tasksContainerEL.addEventListener("click", (e) => {
            let xPosition = e.clientX;
            let yPosition2 = e.clientY;
            let translatedPosition = `translate3d(${xPosition}px, ${yPosition2}px, 0)`;
            console.log(translatedPosition);
            if (this.move) {
              this.targetEl = document.querySelector(`#${this.divName}`);
              this.targetEl.style.transform = translatedPosition;
              this.move = false;
            }
            this.#setTaskEventListeners();
          });
          this.#setTasks();
          this.#setTaskEventListeners();
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
          div.className = "tasks";
          div.id = `tasks${this.taskCounter}`;
          this.tasksContainerEL.append(div);
          this.textInputEL.value = "";
        }
        displayAllTasks() {
          for (const e of this.model.allTasks()) {
            this.taskCounter += 1;
            const div = document.createElement("div");
            div.textContent = e.description;
            div.className = "tasks";
            div.id = `tasks${this.taskCounter}`;
            this.tasksContainerEL.append(div);
          }
        }
        #setTasks() {
          this.api.loadData((Response) => {
            this.model.setTasks(Response);
            this.displayAllTasks();
          });
        }
        #setTaskEventListeners() {
          this.taskELs = document.querySelectorAll(".tasks");
          console.log(this.taskELs);
          this.taskELs.forEach((task) => {
            task.addEventListener("dblclick", () => {
              this.move = true;
              this.divName = task.id;
            });
          });
        }
        #moveTask(e, el) {
          let xPosition = e.clientX;
          let translatedPosition = `translate3d(${xPosition}px, ${yPosition}px, 0)`;
          el.style.transform = translatedPosition;
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
})();
