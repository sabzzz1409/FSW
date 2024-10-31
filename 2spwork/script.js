var taskList = []
var num=1

//display
function renderTasks(containerList){
    root.innerHTML=''
    containerList.map((work,index)=>{
        root.innerHTML+=`
            <tr>
                <td>${index+1}</td>
                <td>${work}</td>
                <td><i class="fa-solid fa-trash" data-index="${index}" data-action="delete"></i></td>
                <td><i class="fa-solid fa-pen-to-square" data-index="${index}" data-action="edit"></i></td>
            </tr>
        `
    })
}

function disp(){
    num*=-1
    num>0?displayData.style.visibility="visible":displayData.style.visibility="hidden"
}

//create
submit.addEventListener('click',()=>{
    taskList.push(entry.value)
    renderTasks(taskList)
    entry.value=''
})

//delete,edit
root.addEventListener('click',(e)=>{
    //delete
    if(e.target.dataset.action=="delete"){
        taskList.splice(e.target.dataset.index,1)
    }
    //edit
    else if(e.target.dataset.action=="edit"){
        taskList[e.target.dataset.index]=prompt(`change data at ${parseInt(e.target.dataset.index)+1}`)
    }

    renderTasks(taskList)
})

