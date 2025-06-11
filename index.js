import chalk from 'chalk';
let args = process.argv.slice(2);
//console.log(args[1]);

if (args[0].toLowerCase() === "add" ){
    addTask(args[1]);
}
if (args[0].toLowerCase() === "update" ){
    updateTask(args[1]);
}
if (args[0].toLowerCase() === "delete" ){
    deleteTask(args[1]);
}
if (args[0].toLowerCase() === "list" ){
    listTask(args[1]);
}
function addTask(data){
    console.log("Added task:" + chalk.yellow(data));
}

function updateTask(data){
    console.log("Updated task:" + data);
}

function deleteTask(data){
    console.log("Deleted task:" + data);
}

function currentStatus(data){
    console.log("Current status:" + data);
}

function listTasks(data){
    console.log("List of tasks:" + data);
}

