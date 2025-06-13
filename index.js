import chalk from 'chalk';
import fs from 'fs';

const TASKS_FILE = 'tasks.json';
let args = process.argv.slice(2);
//console.log(args[1]);
let tasks = [];
let emptyArray = [];
let taskObject;
let currentTime = new Date();

if(!fs.existsSync('data.json')){
        fs.writeFileSync('data.json',JSON.stringify(emptyArray,null,2),'utf8');
    }

if (args[0].toLowerCase() === "add" ){
    addTask(args);
}
if (args[0].toLowerCase() === "update" ){

    // we're pushing just the second and third arguments as data, second one being the id, third is the update
    let data = [args[1],args[2]];
    updateTask(data);
}

if (args[0].toLowerCase() === "delete" ){
    // we're pushing the second argument as data, since it is the id that we have to delete
    let data = [args[1]]
    deleteTask(data);
}

if (args[0].toLowerCase() === "list" ){
    let data = [args[0],args[1]];
    listTask(data);
}

if (args[0].toLowerCase() === "mark-in-progress" ){
    let data = [args[1]];
    updateProgress(data);
}

if (args[0].toLowerCase() === "mark-done" ){
    let data = [args[1]];
    markDone(data);
}

function checkFile(){
    if(fs.existsSync('data.json')){
        return true;
    }
}

function isFileEmpty(){
   /* This function checks if the json file is empty, important to prevent runtime issues */
    const fileData = fs.readFileSync('data.json','utf8');
    if(fileData.length === 0){
        return true;
    }
}

function searchIndex(id){
    const fileData = fs.readFileSync('data.json','utf8');
    const tasks = JSON.parse(fileData);
    return tasks.findIndex(task => task.id === id);
}

function loadTasks(){
    if(!checkFile()){
        fs.writeFileSync('data.json',JSON.stringify(emptyArray,null,2),'utf8');
    }
    /* To check if the file is empty and if empty, an empty array will be pushed into the file first */
    if(isFileEmpty()){
        fs.writeFileSync('data.json',JSON.stringify(emptyArray,null,2),'utf8');
    }
    if(checkFile()){
        const fileContent = fs.readFileSync('data.json','utf8');
        let existingTasks = JSON.parse(fileContent);
        tasks.push(...existingTasks);
        fs.writeFileSync('data.json', JSON.stringify(tasks,null, 2),'utf8');
    }
    else{
        fs.writeFileSync('data.json', JSON.stringify(tasks,null, 2),'utf8');
    }
    
}

function listTask(data){
    if(!data[1]){
        if(checkFile()){
            const fileContent = fs.readFileSync('data.json','utf8');
            let existingTasks = JSON.parse(fileContent);
            console.log(existingTasks);
            //console.log("printed from the wrong box!")
        }
        if(!checkFile()){
            console.log("File does not exist")
        }

    }
    else{
        
        if(checkFile()){
            const fileContent = fs.readFileSync('data.json','utf8');
            let existingTasks = JSON.parse(fileContent);
            let sortedList = [];
            for(let i = 0; i<existingTasks.length; i++){
                if(existingTasks[i].status===data[1]){
                    //console.log("inside the block");
                    sortedList.push(existingTasks[i]);
                }

            }
            //console.log("outside the block")
            console.log(sortedList);
        }
    
    }
      
}

function addTask(data){

    console.log("Added task:" + chalk.yellow(data[1]));
    
    if(data.length !==2){
        console.log("Enter the data properly");
        return;
    }
    const [command, taskInfo] = data;
    if(command === "add"){
        const randomId = Math.floor(Math.random()*100);
        taskObject = {
            desc: taskInfo,
            id: randomId.toString(),
            status: "todo",
            createdAt: currentTime.toLocaleString(),
            updatedAt: ""
        }
    };
    
    tasks.push(taskObject);
    
    loadTasks();
    return;

}
//console.log(tasks);



function updateTask(data){
    
    console.log("Updated task:" + chalk.green(data[1]));
    let id = data[0];
    const fileContent = fs.readFileSync('data.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    if(searchIndex(id)!== -1){
        for(let i=0; i<existingTasks.length; i++){
            if(existingTasks[i].id===id){
                existingTasks[i].desc = data[1];
                existingTasks[i].updatedAt = currentTime.toLocaleString();
                fs.writeFileSync('data.json', JSON.stringify(existingTasks, null, 2), 'utf8');
                
            }
        }
    }
    else{
        console.log("Task not present in the list.");
    }

}



function deleteTask(data){
    console.log("Deleted task:" + data);
    let id = data[0];
    const fileContent = fs.readFileSync('data.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    if(searchIndex(id)!== -1){
        for(let i=0; i<existingTasks.length; i++){
            if(existingTasks[i].id===id){
                existingTasks.splice(i,1);
                fs.writeFileSync('data.json', JSON.stringify(existingTasks, null, 2), 'utf8');
                
            }
        }
    }
    else{
        console.log("Task not present in the list.");
    }
}

function updateProgress(data){
    console.log("Progress updated:" + data);
    let id = data[0];
    const fileContent = fs.readFileSync('data.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    if(searchIndex(id)!== -1){
        for(let i=0; i<existingTasks.length; i++){
            if(existingTasks[i].id===id){
                existingTasks[i].status="in-progress"
                fs.writeFileSync('data.json', JSON.stringify(existingTasks, null, 2), 'utf8');
                
            }
        }
    }
    else{
        console.log("Task not present in the list.");
    }
}

function markDone(data){
    let id = data[0];
    const fileContent = fs.readFileSync('data.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    if(searchIndex(id)!== -1){
        for(let i=0; i<existingTasks.length; i++){
            if(existingTasks[i].id===id){
                existingTasks[i].status="done"
                fs.writeFileSync('data.json', JSON.stringify(existingTasks, null, 2), 'utf8');
                
            }
        }
    }
    else{
        console.log("Task not present in the list.");
    }
}

// function listTasks(data){
//     console.log("List of tasks:" + data);
// }

