'use strict'

// 유저가 값을입력한다
// 플러스 버튼을 누르면 할일이 추가된다
// check버튼을누르면 할일에 밑줄이 간다
// 각 탭에 따라 탭에 관련된 아이템만 나온다


// 유저가 값을입력한다
let taskInput = document.querySelector('.task-input')
let addBtn = document.querySelector('.add-button')
let tabs = document.querySelectorAll('.task-tabs div')
let taskList =[]
let mode = 'all'
let filterList = []

let underLine =document.querySelector('.under-line')
tabs.forEach(menu => menu.addEventListener('click',(e) => horizontalIndicator(e)))
function horizontalIndicator(e){
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight -4) +"px";
}

addBtn.addEventListener('click',addTask)
taskInput.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        addTask(event)
    }
})

for(let i = 0; i <tabs.length; i++){
    tabs[i].addEventListener('click',function(event){filter(event)} )
}

function addTask(){
    let task = {
        id:randomID(),
        taskContent:taskInput.value,
        isComplete:false,
    }
    if(task.taskContent == ''){
        return;
    }
    taskList.push(task)
    taskInput.value ='';
    render()
}

function render() {
    let list =[]
    if(mode == 'all'){
        list = taskList
    }else if(mode =="ongoing" || mode =="done"){
        list = filterList
    }

    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task task-finish">
            <div class="task-name task-done">${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left check-btn"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can delete-btn"></i></button>
            </div>
        </div>`
        }else{
            resultHTML +=`<div class="task">
            <div class="task-name">${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check check-btn"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can delete-btn"></i></button>
            </div>
        </div>`
        }
    }
    document.querySelector('.task-board').innerHTML =resultHTML
}

function toggleComplete(id) {
    for(let i = 0; i <taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete =!taskList[i].isComplete
            break;
        }
    }
    render()
}

function deleteTask(id) {
    for(let i =0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

function filter(event) {
    mode = event.target.id
    filterList =[]
    if(mode == "all"){
        render()
    }else if(mode == "ongoing"){
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])

            }
        }
        render()
    }else if(mode =="done"){
        for(let i =0; i <taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}



function randomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
