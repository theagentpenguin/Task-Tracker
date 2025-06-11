import chalk from 'chalk';
import fs from 'fs';

const TASKS_FILE = 'tasks.json';
let args = process.argv.slice(2);
//console.log(args[1]);
let tasks = [];
let taskObject;

if (args[0].toLowerCase() === "add" ){
    addTask(args);
}
// if (args[0].toLowerCase() === "update" ){
//     updateTask(args[1]);
// }
// if (args[0].toLowerCase() === "delete" ){
//     deleteTask(args[1]);
// }
if (args[0].toLowerCase() === "list" ){
    const fileContent = fs.readFileSync('data.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    console.log(existingTasks);
}
function addTask(data){

    console.log("Added task:" + chalk.yellow(data[1]));
    
    if(data.length !==2){
        console.log("Enter the data properly");
        return;
    }
    const [command, taskInfo] = data;
    if(command === "add"){
        const randomId = Math.floor(Math.random()*1000000);
        taskObject = {
            desc: taskInfo,
            id: randomId.toString()
        }
    };
    tasks.push(taskObject);
    
    loadTasks();
    return;

}
//console.log(tasks);
function loadTasks(){
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

function checkFile(){
    if(fs.existsSync('data.json')){
        return true;
    }
}
// function updateTask(data){
//     console.log("Updated task:" + data);
// }

// function deleteTask(data){
//     console.log("Deleted task:" + data);
// }

// function currentStatus(data){
//     console.log("Current status:" + data);
// }

// function listTasks(data){
//     console.log("List of tasks:" + data);
// }

