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
          this.#setTasks();
          this.textInputEL = document.querySelector("#tasks-input");
        }
        displayAllTasks() {
          for (const e of this.model.allTasks()) {
            const div = document.createElement("div");
            div.textContent = e;
            div.className = "task";
            this.body.append(div);
          }
        }
        #setTasks() {
          this.api.loadData((Response) => {
            this.model.setTasks(Response);
          });
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
  tasksView.displayAllTasks();
})();
