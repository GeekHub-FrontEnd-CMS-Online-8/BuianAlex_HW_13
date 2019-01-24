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
    for (let index = 0; index < taskList.length; index++) {
      switch (this.model.taskFilter) {
        case "completed":
          if (taskList[index].completed){
           this.createTableRow(taskList, index);
          }
          break;
        case "notCompleted":
          if (!taskList[index].completed) {
            this.createTableRow(taskList, index);
          }
          break;
        case "all":
            this.createTableRow(taskList, index);
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
  createTableRow(taskList, index){
    let taskRow = document.createElement("tr");
    if(taskList[index].completed){
      taskRow.classList.add("table-success");
    }

      let order = document.createElement("td");
      order.innerHTML = index + 1;
      taskRow.appendChild(order);

      let autor = document.createElement("td");
      autor.innerHTML = this.model.getAutor(taskList[index].userId);
      taskRow.appendChild(autor);

      let title = document.createElement("td");
      title.innerHTML = taskList[index].title;
      taskRow.appendChild(title);
      
      let actions = document.createElement("td");
      this.createActionBar(actions, taskList[index].id,  taskList[index].completed);
      taskRow.appendChild(actions );

      this.wraper.appendChild(taskRow);
  }

  showMsg(text){
    let textWraper = document.createElement("div");
    textWraper.classList.add("text-msg");
    textWraper.textContent = text;
    document.querySelector(".main").prepend(textWraper);
  }
  
  createActionBar(taskRow, idTask, status) {
    let del = `<i class="fas fa-trash-alt"></i>`;
    let edit = `<i class="fas fa-edit"></i>`;
    let wait = `<i class="far fa-square"></i>`;
    let done = `<i class="fas fa-check-square"></i>`;
    let taskStatus = 0;


    switch (status) {
        case true:
            taskStatus =  done;
            break;
    
        default:
            taskStatus =  wait;
            break;
    }
    let donBtn = document.createElement("button");
    donBtn.classList.add("btn");
    donBtn.classList.add("btn-outline-success");
    donBtn.setAttribute("data-index", idTask);
    donBtn.innerHTML  = taskStatus;
    
    donBtn.addEventListener('click',
    (e) => this.emit('completed',e.currentTarget));      
    
    taskRow.appendChild(donBtn);

    let showBtn = document.createElement("button");
    showBtn.classList.add("btn");
    showBtn.classList.add("btn-outline-primary");
    showBtn.setAttribute("data-index", idTask);
    showBtn.innerHTML  = edit;
    showBtn.addEventListener("click",
      (e) => this.emit('show', e.currentTarget));
    taskRow.appendChild(showBtn);
    
    let delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-outline-danger");
    delBtn.setAttribute("data-index", idTask);
    delBtn.innerHTML  = del;
    delBtn.addEventListener("click", 
    (e) => this.emit('delete',e.currentTarget));
    taskRow.appendChild(delBtn);       
}

};
