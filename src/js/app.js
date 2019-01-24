import $ from "jquery";
//import ModelLocalStorage from './module';
import Controller from './toDoControl';
import Model from './toDoModel';
import View from './toDoView';
const model = new Model();
const view = new View(model, {
  wraper: document.getElementById("task-list"),
  btnAddNew: document.getElementById('createNew'),
  btnSave: document.getElementById('save'),
  btnLoadMore: document.getElementById('load-more'),
  btnShowAll: document.getElementById('showAll'),
  btnShowComleted: document.getElementById('showComleted'),
  btnshowNotCompled: document.getElementById('showNotCompled'),
})
const control = new Controller(model, view);
view.rebuildTable();
view.filterBtnClassToggle();
//control.getData();

//ModelLocalStorage();