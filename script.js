function addItem(event)
{
    event.preventDefault();
    let text = document.getElementById("todo-input");
    generateItems(text);
    text.value=null;
    getActiveStatus();
    displayMsg("good");
}


function generateItems(text){
    let items = document.querySelector(".todo-items");
    items.innerHTML=`
        <div status="active" onclick="checkItem(this)" class="todo-item">
            <div class="check">
                <div class="check-mark">
                    
                </div>
            </div>
            <div class="todo-text">
                ${text.value}
            </div>
        </div>
    ` + items.innerHTML;
    updateTodoListStatus();
}

function checkItem(item){
    if(item.getAttribute("status")=="active"){
        item.setAttribute("class","todo-item checked-item");
        item.setAttribute("status","completed");
    }
    else{
        item.setAttribute("class","todo-item");
        item.setAttribute("status","active");
    }
    updateTodoListStatus();
    getActiveStatus();
}


function updateTodoListStatus(){
    let allItems = document.getElementsByClassName("todo-item").length;
    let completedItems = document.getElementsByClassName("checked-item").length;
    let itemsLeft = allItems - completedItems;
    document.querySelector(".items-left").innerHTML = itemsLeft + " items left";
}


//change active flag to currant status and remove it from the old one
//Initialize the items display either to be hidden or none
//display could have the value :"true" or "none"
function setActiveStatus(status,display){
    let active = document.getElementsByClassName("active")[0];
    active.setAttribute("class","");
    status.setAttribute("class","active");
    //change all items to the normal style
    let items = document.getElementsByClassName("todo-item");
    for(let i = 0; i < items.length; i++)
    {
        items[i].style="display:"+display;
    }
}

function generateActiveItems(status){
    setActiveStatus(status,"true");
    let items = document.getElementsByClassName("checked-item");
    for(let i = 0; i < items.length; i++)
    {
        items[i].style="display:none";
    }
}

function generateCompletedItems(status){
    setActiveStatus(status,"none");
    let items = document.getElementsByClassName("checked-item");
    for(let i = 0; i < items.length; i++)
    {
        items[i].style="display:true";
    }
}

function generateAllItems(status){
    setActiveStatus(status);
}

//get the active todo list status
//and by that if you select active items and checked an item of them
//it will get removed automatically from active items
function getActiveStatus(){
    let activeStatus = document.getElementsByClassName("active")[0];
    switch(activeStatus.innerHTML){
        case "All" : generateAllItems(activeStatus);break;
        case "Active" : generateActiveItems(activeStatus);break;
        case "Completed" : generateCompletedItems(activeStatus);break;
    }
}

//Clear Completed items
function clearComplitedItems(){
    let todoItems = document.getElementsByClassName("todo-item");
    let list = new Array();
    for(let i=0; i < todoItems.length; i++){
        if(todoItems[i].getAttribute("status")=="active")
            list.push(todoItems[i].innerHTML);
    }
    //rebuild the todo list with unchecked items
    let todoItemsBody = document.getElementsByClassName("todo-items")[0];
    todoItemsBody.innerHTML="";
    for(let i=0; i < list.length; i++){
        todoItemsBody.innerHTML+=`
            <div status="active" onclick="checkItem(this)" class="todo-item">
                ${list[i]}
            </div>
        `
    }
    getActiveStatus();
}

//Clear all todo list items
function clearAll(){
    todoItems = document.getElementsByClassName("todo-items")[0].innerHTML="";
    updateTodoListStatus();
}

//change to dark mode
function actionDarkMode(darkBtn){
    let darkModeStyle = document.getElementsByClassName("darkModeStyle")[0];
    let svgBtn = document.getElementsByClassName("darkBtn");
    if(svgBtn[0].getAttribute("class") == "darkBtn hiddenDarkBtn"){
        svgBtn[0].setAttribute("class","darkBtn");
        svgBtn[1].setAttribute("class","darkBtn hiddenDarkBtn");
        darkModeStyle.setAttribute("href","");
    }
    else{
        svgBtn[0].setAttribute("class","darkBtn hiddenDarkBtn");
        svgBtn[1].setAttribute("class","darkBtn");
        darkModeStyle.setAttribute("href","dark_style.css");
    }
}
function displayMsg(msg){
    
}