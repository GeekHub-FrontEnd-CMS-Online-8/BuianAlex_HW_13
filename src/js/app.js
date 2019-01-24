import $ from "jquery";
import Controller from './toDoControl';
import Model from './toDoModel';
import View from './toDoView';
const model = new Model();
const view = new View(model, {
  //подключаем элементы управления интерфейса
  wraper: document.getElementById("task-list"),
  btnAddNew: document.getElementById('createNew'),
  btnSave: document.getElementById('save'),
  btnLoadMore: document.getElementById('load-more'),
  btnShowAll: document.getElementById('showAll'),
  btnShowComleted: document.getElementById('showComleted'),
  btnshowNotCompled: document.getElementById('showNotCompled'),
  btnOrderTasks: document.getElementById('tasks-order'),
})
const control = new Controller(model, view);
view.rebuildTable();
//control.getData();
