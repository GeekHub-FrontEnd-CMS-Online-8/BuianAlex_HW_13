export default class Model {
  constructor(view) {
    this.view = view;
    this.taskList = JSON.parse(window.localStorage.getItem('data'))|| [];
    this.lastId = JSON.parse(window.localStorage.getItem('lastID'))|| 1;
    this.loadStep = JSON.parse(window.localStorage.getItem('loadStep')) || 0;
    this.taskFilter = JSON.parse(window.localStorage.getItem('taskFilter')) || "all";
    this.activeUser = 1;

  }
  toStorage(userId, title, fullText, completed = false){
    this.taskList.push({
    "id": this.lastId,
    "userId": userId,    
    "title": title,
    "fullText": fullText,
    "completed": completed});
    this.lastId++;
    this.setLastID(this.lastId); 
    window.localStorage.setItem('data', JSON.stringify(this.taskList));   
  }
  
  findTaskById(id){
    for (let index = 0; index < this.taskList.length; index++) {
      if(this.taskList[index].id==id){
        return {index:index, data: this.taskList[index]}
      }         
    }
  }
  filterTask(filterType){
    this.taskFilter = filterType;
    window.localStorage.setItem('taskFilter', JSON.stringify(this.taskFilter));
  }
  
  setComplited(id){
    let task = this.findTaskById(id);
    task.data.completed = !task.data.completed;
    this.taskList[task.index] =task.data;
    this.updateStorage();
  }
  updateTask(id, title, fullText){
    let task = this.findTaskById(id);    
    task.data.title = title;
    task.data.fullText = fullText;
    this.taskList[task.index] =task.data;
    this.updateStorage();
  }
  deleteTask(id){
    let task = this.findTaskById(id);
    this.taskList.splice(task.index, 1);
    this.updateStorage();
  }
  
  updateStorage(){ 
    window.localStorage.setItem('data', JSON.stringify(this.taskList));
  }

  setLastID(lastId){
    window.localStorage.setItem('lastID', JSON.stringify(lastId)); 
  } 
  getAutor(){
    return "Admin";
  }

  loadMore( ){
    console.log("step"+this.loadStep);
    let maxItem = 5;
    let json = JSON.parse(window.localStorage.getItem('testDB'));
    if (this.loadStep > json.length){

    }
    for (let index = this.loadStep; index < json.length; index++) {
      if(index+1!==json.length){
        
      }
      
      
      if (this.loadStep+maxItem != index) {
        this.toStorage(json[index].userId, json[index].title, " ", json[index].completed);       
      }
      else{
        this.loadStep += maxItem
        window.localStorage.setItem('loadStep', JSON.stringify(this.loadStep));
        break;
      }
      
    }
    
  }
    
}