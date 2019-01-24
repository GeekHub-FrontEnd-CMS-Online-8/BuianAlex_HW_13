import $ from "jquery";
import EventEmitter from './EventEmitter';
import Model from "./toDoModel";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.view.btnLoadMore.addEventListener('click',
      e => { this.actionLoadMore() });
    
    this.view.btnAddNew.addEventListener('click',
    e => { this.modalNewTask()});
    
    this.view.btnSave.addEventListener('click',
      e => { this.actionSave(e);});
    this.view.btnShowAll.addEventListener('click',
      e => { this.actionFilter("all"); });
    this.view.btnShowComleted.addEventListener('click',
      e => { this.actionFilter("completed"); });
    this.view.btnshowNotCompled.addEventListener('click',
      e => { this.actionFilter("notCompleted"); });     

    
    view.on('completed', (task) => this.actionComplited(task));
    view.on('delete', (task) => this.actionDelete(task));
    view.on('show', (task) => this.actionShowTask(task));

  }
  actionComplited(task){
    this.model.setComplited(task.getAttribute('data-index'));
    this.view.rebuildTable();
  }
  actionDelete(task){
    this.model.deleteTask(task.getAttribute('data-index'));
    this.view.rebuildTable();
  }
  actionShowTask(task) {
    let taskData = this.model.findTaskById(task.getAttribute('data-index'));
    this.view.btnSave.setAttribute("action", "update");
    document.getElementById('myModal').setAttribute("data-index", taskData.data.id);
    document.getElementById('modal-title').textContent = "TaskID: "+taskData.data.id;
    document.getElementById('title-todo').value = taskData.data.title;
    document.getElementById('textToDo').value = taskData.data.fullText;
    $("#myModal").modal("show");
  }

  actionLoadMore(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => this.model.loadMore(json))
      .catch(function () {
        console.log("error");
      });
    this.view.rebuildTable(); 
  }

  actionFilter(filterType){
    this.model.filterTask(filterType);
    this.view.rebuildTable();
  }
  
  getData(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => model)
      //.then(json => window.localStorage.setItem('testDB', JSON.stringify(json)))
      .catch(function () {
        console.log("error");
      });
  }
 

  modalNewTask(){
    document.getElementById('myModal').setAttribute("data-index", '');
    document.getElementById("modal-title").textContent= "ADD new task";
    document.getElementById('title-todo').value = '';
    document.getElementById('textToDo').value = '';

    this.view.btnSave.setAttribute("action", "saveNew");
    $("#myModal").modal("show");
  }
  
  actionSave(e){
    let titleToDo =  document.getElementById('title-todo');
    let textToDo = document.getElementById('textToDo');
    if (e.currentTarget.getAttribute('action') === 'saveNew'){
      this.model.toStorage(this.model.activeUser,titleToDo.value, textToDo.value);
    }
    if (e.currentTarget.getAttribute('action') === 'update') {
      let id = document.getElementById('myModal').getAttribute('data-index');
      this.model.updateTask(id, titleToDo.value, textToDo.value);
    }
    document.getElementById('myModal').setAttribute("data-index", '');
    titleToDo.value = '';
    textToDo.value = '';
    $("#myModal").modal('hide');
    this.view.rebuildTable();
  }
  


  setView(){
    if(this.model.taskList.length === 0){
      this.view.showMsg("no tasks yet");
    }
    else{
       this.view.showTaskList(this.model.taskList,3);  
    }
  }




};