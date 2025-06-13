# Task-Tracker

A CLI app to track your tasks and manage your to-do list!

To run this project, download the repository to your machine.
Once downloaded, open terminal and navigate to the project directory.

Run the js file using Node.
Eg: node taskTracker.js add "buy groceries"

You can use the following commands:

add => adds the item to the list

update => you can update the items using their id.
eg: node taskTracker.js update 34 "buy groceries and cook dinner"

delete => deletes the task
eg: node taskTracker.js delete 34

mark-done => This will mark the status of a task as 'done'
eg: node taskTracker.js mark-done 25

mark-in-progress => This will mark the status of a task as 'in=progress'
eg: node taskTracker.js mark-in-progress 25

list => this will list all the tasks that are present in the json file currently
list done => this will display the tasks that have the status as 'done'
list in-progress => this will display the tasks that have the status as 'in-progress'

This project helped me learn a lot! I'll try to make this an interactive command-line application where
you don't have to run 'node taskTracker.js' every single time.

Please try this and raise issues if you find any! This project is a part of backend projects by roadmap.sh

Checkout the link below for more details!

https://roadmap.sh/projects/task-tracker
