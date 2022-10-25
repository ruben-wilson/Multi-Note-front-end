(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/controllers/tasksController.js
  var require_tasksController = __commonJS({
    "lib/controllers/tasksController.js"(exports, module) {
      var tasksController2 = class {
        constructor(api, model) {
          this.api = api, this.model = model;
          this.page = document.querySelector(".page");
          this.containerEL = document.querySelector("#testBox");
          this.footerContainerEl = document.querySelector(".footerContainer");
          this.taskCounter = 0;
          this.#setTasks();
          this.addTaskEL = document.querySelector("#add-task");
          this.addTaskEL.addEventListener("click", () => {
            const containerDiv = document.createElement("div");
            containerDiv.id = "testContainer";
            const inputEL = document.createElement("input");
            inputEL.type = "text";
            inputEL.id = "input";
            const dateInputEl = document.createElement("input");
            dateInputEl.type = "date";
            const timeInputEl = document.createElement("input");
            timeInputEl.type = "time";
            const buttonEl = document.createElement("button");
            buttonEl.id = "createTask";
            buttonEl.innerText = "create task";
            containerDiv.append(inputEL, dateInputEl, timeInputEl, buttonEl);
            this.page.append(containerDiv);
            this.createTaskEl = document.querySelector("#createTask");
            this.createTaskEl.addEventListener("click", () => {
              this.textInputEL = document.querySelector("#input");
              this.api.saveData(this.textInputEL.value);
              this.model.addTask(this.textInputEL.value);
              this.createTask(this.textInputEL.value);
              containerDiv.parentNode.removeChild(containerDiv);
            });
          });
          this.deleteTaskEl = document.querySelector("#delete-task-button");
          this.deleteTaskEl.addEventListener("click", () => {
            this.deleteTask();
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
          this.footerContainerEl.append(div);
        }
        displayAllTasks() {
          for (const e of this.model.allTasks()) {
            this.createTask(e.description);
          }
        }
        deleteTask() {
          const tasks_array = this.model.allTasks();
          this.api.deleteData(tasks_array.reverse()[0].description);
          let taskToDelete = document.querySelectorAll(".tasks");
          taskToDelete = taskToDelete[taskToDelete.length - 1];
          taskToDelete.parentNode.removeChild(taskToDelete);
          location.reload();
        }
        #setTasks() {
          this.api.loadData((Response) => {
            this.model.setTasks(Response);
            this.displayAllTasks();
          });
        }
        #dragStart(e) {
          e.dataTransfer.setData("text/plain", e.target.id);
          setTimeout(() => {
            e.target.classList.add("hide");
          }, 0);
        }
      };
      module.exports = tasksController2;
    }
  });

  // lib/apis/tasksApi.js
  var require_tasksApi = __commonJS({
    "lib/apis/tasksApi.js"(exports, module) {
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
        deleteData(description) {
          const input_data = { data: description };
          fetch("http://localhost:3000/tasks", {
            method: "DELETE",
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

  // lib/models/tasksModel.js
  var require_tasksModel = __commonJS({
    "lib/models/tasksModel.js"(exports, module) {
      var TasksModel2 = class {
        constructor() {
          this.tasks = [];
        }
        setTasks(tasks_array) {
          this.tasks = tasks_array;
        }
        addTask(task_description) {
          this.tasks.push({ description: task_description, urgency: null });
        }
        allTasks() {
          return this.tasks;
        }
      };
      module.exports = TasksModel2;
    }
  });

  // lib/controllers/dropboxview.js
  var require_dropboxview = __commonJS({
    "lib/controllers/dropboxview.js"(exports, module) {
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
          const draggable = document.getElementById(id);
          e.target.appendChild(draggable);
          draggable.classList.remove("hide");
        }
      };
      module.exports = DropBoxesView;
    }
  });

  // lib/controllers/goalsController.js
  var require_goalsController = __commonJS({
    "lib/controllers/goalsController.js"(exports, module) {
      var goalsController2 = class {
        constructor(api, model) {
          this.api = api;
          this.model = model;
          this.goalsContainerEL = document.querySelector(".goalsContainer");
          this.#setGoals();
          this.textInputEL = document.querySelector("#input");
          this.addGoalEl = document.querySelector("#add-goal");
          this.addGoalEl.addEventListener("click", () => {
            this.api.saveData(this.textInputEL.value);
            this.model.addGoal(this.textInputEL.value);
            this.createGoal(this.textInputEL.value);
          });
          this.deleteGoalsEl = document.querySelector("#delete-goal-button");
          this.deleteGoalsEl.addEventListener("click", () => {
            this.deleteGoal();
            this.model.deleteGoal();
            console.log(this.model.allGoals());
          });
        }
        createGoal(text) {
          const div = document.createElement("div");
          div.textContent = text;
          div.draggable = true;
          div.className = "goals";
          div.id = "goal";
          this.goalsContainerEL.append(div);
          this.textInputEL.value = "";
        }
        displayAllGoals() {
          for (const goal of this.model.allGoals()) {
            this.createGoal(goal.description);
          }
        }
        deleteGoal() {
          const goals_array = this.model.allGoals();
          this.api.deleteData(goals_array.reverse()[0].description);
          console.log(goals_array.reverse()[0].description);
          let goalToDelete = document.querySelectorAll(".goals");
          goalToDelete = goalToDelete[goalToDelete.length - 1];
          goalToDelete.parentNode.removeChild(goalToDelete);
          location.reload();
        }
        #setGoals() {
          this.api.loadData((response) => {
            this.model.setGoals(response);
            this.displayAllGoals();
          });
        }
      };
      module.exports = goalsController2;
    }
  });

  // lib/apis/goalsApi.js
  var require_goalsApi = __commonJS({
    "lib/apis/goalsApi.js"(exports, module) {
      var GoalsApi = class {
        loadData(callback) {
          fetch("http://localhost:3000/goals").then((response) => response.json()).then((response_json) => callback(response_json));
        }
        saveData(input) {
          const input_data = { data: input };
          fetch("http://localhost:3000/goals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(input_data)
          }).then((response) => console.log(response));
        }
        deleteData(description) {
          const input_data = { data: description };
          console.log(description);
          fetch("http://localhost:3000/goals", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(input_data)
          }).then((response) => console.log(response));
        }
      };
      module.exports = GoalsApi;
    }
  });

  // lib/models/goalsModel.js
  var require_goalsModel = __commonJS({
    "lib/models/goalsModel.js"(exports, module) {
      var GoalsModel2 = class {
        constructor() {
          this.goals = [];
        }
        setGoals(goals_array) {
          this.goals = goals_array;
        }
        allGoals() {
          return this.goals;
        }
        addGoal(goal_description) {
          this.goals.push({ description: goal_description, done: null });
        }
        deleteGoal() {
          this.goals.pop();
        }
      };
      module.exports = GoalsModel2;
    }
  });

  // index.js
  var TasksController = require_tasksController();
  var TaskApi = require_tasksApi();
  var TasksModel = require_tasksModel();
  var DropBoxView = require_dropboxview();
  var GoalsController = require_goalsController();
  var GoalApi = require_goalsApi();
  var GoalsModel = require_goalsModel();
  var taskApi = new TaskApi();
  var taskModel = new TasksModel();
  var goalApi = new GoalApi();
  var goalModel = new GoalsModel();
  var tasksController = new TasksController(taskApi, taskModel);
  var goalsController = new GoalsController(goalApi, goalModel);
  var dropboxView = new DropBoxView();
})();
