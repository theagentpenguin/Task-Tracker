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
// if (args[0].toLowerCase() === "list" ){
//     listTask(args[1]);
// }
function addTask(data){

    console.log("Added task:" + chalk.yellow(data));
    
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
    console.log(taskObject);
    loadTasks();
    return;

}
console.log(tasks);
function loadTasks(){
    fs.writeFileSync('data.json', JSON.stringify(tasks, 2),'utf8');
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

