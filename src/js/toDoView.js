import $ from "jquery";
import EventEmitter from './EventEmitter';

export default class View extends EventEmitter { 
  constructor(model, elements) {
    super();
    this.model = model;
    this.wraper = elements.wraper;
    this.btnAddNew = elements.btnAddNew;
    this.btnSave = elements.btnSave;
    this.btnLoadMore = elements.btnLoadMore;
    this.btnShowAll = elements.btnShowAll;
    this.btnShowComleted = elements.btnShowComleted;
    this.btnshowNotCompled = elements.btnshowNotCompled;
  }
  rebuildTable(){
    this.wraper.innerHTML = " ";
    //this.showTaskList(this.model.taskList);
    this.filterBtnClassToggle(); 
    if (this.model.taskList.length === 0) {
      this.showMsg("no tasks yet");
    }
    else {
      let warningMsg = document.querySelector('.text-msg');
      if (warningMsg){
        warningMsg.remove();
      }
      
      this.showTaskList(this.model.taskList, 3);
    }
  }

  showTaskList(taskList){
    let calcShowed = 0;
    console.log();
    
    for (let index = 0; index < taskList.length; index++) {
      switch (this.model.taskFilter) {
        case "completed":
          if (taskList[index].completed){
            calcShowed++;
           this.createTableRow(taskList, index, calcShowed);
          }
          break;
        case "notCompleted":
          if (!taskList[index].completed) {
            calcShowed++;
            this.createTableRow(taskList, index,calcShowed);
          }
          break;
        case "all":
          calcShowed++;
          this.createTableRow(taskList, index, calcShowed);
          break;  
        default: 
          break;
      }     
    }
  }
  filterBtnClassToggle(){
    this.btnShowAll.classList.remove("active");
    this.btnShowComleted.classList.remove("active");
    this.btnshowNotCompled.classList.remove("active");
    switch (this.model.taskFilter) {
      case "completed":
        this.btnShowComleted.classList.add("active");
        break;
      case "notCompleted":
        this.btnshowNotCompled.classList.add("active");
        break;
      case "all":
        this.btnShowAll.classList.add("active");
        break;  
      default: 
        break;
    }     
  }

  createTableRow(taskList, index, calcShowed){
    let taskRow = document.createElement("tr");
    if(taskList[index].completed){
      taskRow.classList.add("table-success");
    }

      let order = document.createElement("td");
      order.innerHTML = calcShowed;
      taskRow.appendChild(order);

      let autor = document.createElement("td");
      autor.classList.add('task-autor');
      autor.innerHTML = this.model.getAutor(taskList[index].userId);
      taskRow.appendChild(autor);

      let title = document.createElement("td");
      title.innerHTML = taskList[index].title;
      title.classList.add('task-title');
      taskRow.appendChild(title);
      
      let actions = document.createElement("td");
      actions.classList.add('task-title');
      this.createActionBar(actions, taskList[index].id,  taskList[index].completed);
      taskRow.appendChild(actions );

      this.wraper.appendChild(taskRow);
  }

  showMsg(text){
    let textWraper = document.createElement("div");
    textWraper.classList.add("text-msg");
    textWraper.textContent = text;
    document.querySelector("body").prepend(textWraper);
  }
  
  createActionBar(taskRow, idTask, status) {
    let del = `<i class="fas fa-trash-alt"></i>`;
    let edit = `<i class="fas fa-edit"></i>`;
    let wait = `<i class="far fa-square"></i>`;
    let done = `<i class="fas fa-check-square"></i>`;
    let taskStatus = 0;

    let donBtn = document.createElement("button");
    donBtn.classList.add("btn");
    donBtn.classList.add("btn-outline-success");
    donBtn.setAttribute("data-index", idTask);
    switch (status) {
      case true:
          taskStatus =  done;
          donBtn.setAttribute('data-title',"Set uncomplete");
          break;
  
      default:
        donBtn.setAttribute('data-title',"Set complete");
        taskStatus =  wait;
        break;
    }
    donBtn.innerHTML  = taskStatus;
    
    donBtn.addEventListener('click',
    (e) => this.emit('completed',e.currentTarget));      
    
    taskRow.appendChild(donBtn);

    let showBtn = document.createElement("button");
    showBtn.classList.add("btn");
    showBtn.classList.add("btn-outline-primary");
    showBtn.setAttribute("data-index", idTask);
    showBtn.setAttribute('data-title',"Edit task");
    showBtn.innerHTML  = edit;
    showBtn.addEventListener("click",
      (e) => this.emit('show', e.currentTarget));
    taskRow.appendChild(showBtn);
    
    let delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-outline-danger");
    delBtn.setAttribute("data-index", idTask);
    delBtn.setAttribute('data-title',"Delete task");
    delBtn.innerHTML  = del;
    delBtn.addEventListener("click", 
    (e) => this.emit('delete',e.currentTarget));
    taskRow.appendChild(delBtn);       
}

};
