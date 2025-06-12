import chalk from 'chalk';
import fs from 'fs';

const TASKS_FILE = 'tasks.json';
let args = process.argv.slice(2);
//console.log(args[1]);
let tasks = [];
let emptyArray = [];
let taskObject;
let currentTime = new Date();

if (args[0].toLowerCase() === "add" ){
    addTask(args);
}
if (args[0].toLowerCase() === "update" ){
    let data = [args[1],args[2]];
    updateTask(data);
}

// if (args[0].toLowerCase() === "delete" ){
//     deleteTask(args[1]);
// }

if (args[0].toLowerCase() === "list" ){
    listTask();
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

function loadTasks(){
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

function listTask(){
    if(isFileEmpty()){
        console.log("The list is empty, start adding!");
    }
    else if(checkFile()){
        
        const fileContent = fs.readFileSync('data.json','utf8');
        let existingTasks = JSON.parse(fileContent);
        console.log(existingTasks);
    }
    else{
        console.log("There is no list yet. Start to add tasks");
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
    
}



// function deleteTask(data){
//     console.log("Deleted task:" + data);
// }

// function currentStatus(data){
//     console.log("Current status:" + data);
// }

// function listTasks(data){
//     console.log("List of tasks:" + data);
// }

