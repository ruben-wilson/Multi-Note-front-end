(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/controllers/tasksController.js
  var require_tasksController = __commonJS({
    "lib/controllers/tasksController.js"(exports, module) {
      var tasksController2 = class {
        constructor(api, model, menu) {
          this.api = api, this.model = model;
          this.menuController = menu;
          this.page = document.querySelector(".page");
          this.containerEL = document.querySelector("#testBox");
          this.footerContainerEl = document.querySelector(".footerContainer");
          this.taskCounter = 0;
          this.#setTasks();
          this.addTaskEL = document.querySelector("#add-task");
          this.addTaskEL.addEventListener("click", () => {
            this.menuController.createMenu();
            this.menuController.onSubmitMenu((task) => {
              this.api.saveData(task.description, task.time, task.date);
              this.model.addTask(task.description, task.time, task.date);
              this.createTask(task.description, task.time);
            });
          });
          this.deleteTaskEl = document.querySelector("#delete-task-button");
          this.deleteTaskEl.addEventListener("click", () => {
            this.deleteTask();
          });
        }
        createTask(text, time) {
          this.taskCounter += 1;
          const div = document.createElement("div");
          div.textContent = text;
          div.draggable = true;
          div.className = "tasks";
          div.id = `task${this.taskCounter}`;
          div.addEventListener("dragstart", this.#dragStart);
          time = time.replace(":", "");
          const boxEl = document.querySelector(`#box${time.slice(0, -2)}00`);
          boxEl.append(div);
        }
        displayAllTasks() {
          for (const e of this.model.allTasks()) {
            this.createTask(e.description, e.time);
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

  // lib/controllers/tasksMenuController.js
  var require_tasksMenuController = __commonJS({
    "lib/controllers/tasksMenuController.js"(exports, module) {
      var TasksMenu = class {
        constructor() {
          this.page = document.querySelector(".page");
        }
        createMenu() {
          const containerDiv = document.createElement("div");
          containerDiv.id = "testContainer";
          const inputEL = document.createElement("input");
          inputEL.type = "text";
          inputEL.id = "tasksInput";
          const dateInputEl = document.createElement("input");
          dateInputEl.id = "tasksDate";
          dateInputEl.type = "date";
          const timeInputEl = document.createElement("input");
          timeInputEl.id = "tasksTime";
          timeInputEl.type = "time";
          const buttonEl = document.createElement("button");
          buttonEl.id = "createTask";
          buttonEl.innerText = "create task";
          containerDiv.append(inputEL, dateInputEl, timeInputEl, buttonEl);
          this.page.append(containerDiv);
        }
        onSubmitMenu(callback) {
          const createTaskEl = document.querySelector("#createTask");
          createTaskEl.addEventListener("click", () => {
            const task = {
              description: document.querySelector("#tasksInput").value,
              date: document.querySelector("#tasksDate").value,
              time: document.querySelector("#tasksTime").value
            };
            callback(task);
          });
        }
      };
      module.exports = TasksMenu;
    }
  });

  // lib/apis/tasksApi.js
  var require_tasksApi = __commonJS({
    "lib/apis/tasksApi.js"(exports, module) {
      var TasksAPi = class {
        loadData(callback) {
          fetch("http://localhost:3000/tasks").then((response) => response.json()).then((response_json) => callback(response_json));
        }
        saveData(description, time, date) {
          const input_data = { description, time, date };
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
        addTask(task_description, task_time, task_date) {
          this.tasks.push({ description: task_description, time: task_time, date: task_date });
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

  // lib/Components/defaultDatesFormatter.js
  var require_defaultDatesFormatter = __commonJS({
    "lib/Components/defaultDatesFormatter.js"(exports, module) {
      var default_setter = class {
        constructor() {
          this.num1 = null;
          this.num2 = null;
        }
        returnTimeRange(string1, string2, type, description) {
          this.num1 = parseInt(string1.replace(":", ""));
          this.num2 = parseInt(string2.replace(":", ""));
          let range;
          if (this.num2 == 0) {
            range = (2400 - this.num1) / 100;
          } else {
            range = (this.num2 - this.num1) / 100;
          }
          let times_array = this.#makeRangeOfInts(range);
          let times_as_string = [];
          times_array.forEach((num) => {
            this.#stringTimeToIntTime(times_as_string, num);
          });
          let correct_time_format = [];
          times_as_string.forEach((time) => {
            this.#ConvertMidnightToZeros(correct_time_format, time);
          });
          let output = [];
          correct_time_format.forEach((time) => {
            output.push({ time, type, description });
          });
          return output;
        }
        #makeRangeOfInts(range) {
          let array = [];
          for (let i = 0; i <= range; i++) {
            let time = `${this.num1}`;
            array.push(time);
            this.num1 += 100;
          }
          return array;
        }
        #stringTimeToIntTime(times_as_string, num) {
          if (num < 1e3) {
            if (num == 0) {
              num.toString();
              let time = "00:00";
              times_as_string.push(time);
            } else {
              num.toString();
              let time = `0${num.at(0)}:${num.substring(1, 3)}`;
              times_as_string.push(time);
            }
          } else {
            num.toString();
            let time = `${num.substring(0, 2)}:${num.substring(2, 4)}`;
            times_as_string.push(time);
          }
        }
        #ConvertMidnightToZeros(output_array, time) {
          if (time === "24:00") {
            time = "00:00";
            output_array.push(time);
          } else {
            output_array.push(time);
          }
        }
      };
      module.exports = default_setter;
    }
  });

  // lib/controllers/defaultsController.js
  var require_defaultsController = __commonJS({
    "lib/controllers/defaultsController.js"(exports, module) {
      var datesFormatter = require_defaultDatesFormatter();
      var DefaultController2 = class {
        constructor() {
          this.page = document.querySelector(".page");
          this.datesFormatter = new datesFormatter();
          this.data = [];
          this.createDefaultEL = document.querySelector("#createDefaults");
          this.createDefaultEL.addEventListener("click", () => {
            this.#createPreWorkDefault(() => {
              this.startTimeEl = document.querySelector("#preWork-StartTime");
              this.endTimeEl = document.querySelector("#preWork-EndTime");
              this.#saveData(this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, "preWork", "Pre-Work Time"));
              this.#createWorkDefault(() => {
                this.startTimeEl = document.querySelector("#Work-StartTime");
                this.endTimeEl = document.querySelector("#Work-EndTime");
                this.#saveData(this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, "work", "Work Time"));
                this.#createPostWorkDefault(() => {
                  this.startTimeEl = document.querySelector("#postWork-StartTime");
                  this.endTimeEl = document.querySelector("#postWork-EndTime");
                  this.#saveData(this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, "postWork", "After Work Time"));
                  console.log(this.data);
                  this.#setDefaultRange();
                });
              });
            });
          });
        }
        #saveData(data) {
          this.data = this.data.concat(data);
        }
        #setDefaultRange() {
          for (const e of this.data) {
            this.#createDefault(e.description, e.type, e.time);
          }
        }
        #createDefault(text, type, time) {
          const div = document.createElement("div");
          div.textContent = text;
          div.draggable = true;
          div.className = "defaults";
          div.id = type;
          time = time.replace(":", "");
          const boxEl = document.querySelector(`#box${time.slice(0, -2)}00`);
          boxEl.append(div);
        }
        #createPreWorkDefault(callback) {
          console.log("1");
          this.containerDiv = document.createElement("div");
          this.containerDiv.id = "testContainer";
          const startLabelEl = document.createElement("small");
          startLabelEl.textContent = "start of preWorkTime";
          const startTimeEl = document.createElement("input");
          startTimeEl.type = "time";
          startTimeEl.id = "preWork-StartTime";
          const endLabelEl = document.createElement("small");
          endLabelEl.textContent = "end of preWorkTime";
          const endTimeEl = document.createElement("input");
          endTimeEl.type = "time";
          endTimeEl.id = "preWork-EndTime";
          const preButtonEl = document.createElement("button");
          preButtonEl.id = "setDefault-preWork";
          preButtonEl.innerText = "set preWorkTime";
          this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, preButtonEl);
          this.page.append(this.containerDiv);
          preButtonEl.addEventListener("click", callback);
        }
        #createWorkDefault(callback) {
          console.log("2");
          this.containerDiv.remove();
          this.containerDiv = document.createElement("div");
          this.containerDiv.id = "testContainer";
          const startLabelEl = document.createElement("small");
          startLabelEl.textContent = "start of WorkTime";
          const startTimeEl = document.createElement("input");
          startTimeEl.type = "time";
          startTimeEl.id = "Work-StartTime";
          const endLabelEl = document.createElement("small");
          endLabelEl.textContent = "end of WorkTime";
          const endTimeEl = document.createElement("input");
          endTimeEl.type = "time";
          endTimeEl.id = "Work-EndTime";
          const workButtonEl = document.createElement("button");
          workButtonEl.id = "setDefault-Work";
          workButtonEl.innerText = "set WorkTime";
          this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, workButtonEl);
          this.page.append(this.containerDiv);
          workButtonEl.addEventListener("click", callback);
        }
        #createPostWorkDefault(callback) {
          console.log("3");
          this.containerDiv.remove();
          this.containerDiv = document.createElement("div");
          this.containerDiv.id = "testContainer";
          const startLabelEl = document.createElement("small");
          startLabelEl.textContent = "start of Post-WorkTime";
          const startTimeEl = document.createElement("input");
          startTimeEl.type = "time";
          startTimeEl.id = "postWork-StartTime";
          const endLabelEl = document.createElement("small");
          endLabelEl.textContent = "end of postWorkTime";
          const endTimeEl = document.createElement("input");
          endTimeEl.type = "time";
          endTimeEl.id = "postWork-EndTime";
          const postButtonEl = document.createElement("button");
          postButtonEl.id = "setDefault-Work";
          postButtonEl.innerText = "set post-WorkTime";
          this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, postButtonEl);
          this.page.append(this.containerDiv);
          postButtonEl.addEventListener("click", callback);
        }
      };
      module.exports = DefaultController2;
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
  var TaskMenuController = require_tasksMenuController();
  var TaskApi = require_tasksApi();
  var TasksModel = require_tasksModel();
  var DropBoxView = require_dropboxview();
  var DefaultController = require_defaultsController();
  var GoalsController = require_goalsController();
  var GoalApi = require_goalsApi();
  var GoalsModel = require_goalsModel();
  var taskApi = new TaskApi();
  var taskModel = new TasksModel();
  var taskMenu = new TaskMenuController();
  var goalApi = new GoalApi();
  var goalModel = new GoalsModel();
  var tasksController = new TasksController(taskApi, taskModel, taskMenu);
  var goalsController = new GoalsController(goalApi, goalModel);
  var defaultsController = new DefaultController();
  var dropboxView = new DropBoxView();
})();
