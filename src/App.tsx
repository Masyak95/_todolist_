import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"


function App() {
    console.log(v1())
    //BLL
    const todoListTitle_1: string = "What to learn today"

    const [tasks_1, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML and CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])


    const removeTask = (taskID: string) => {
        setTasks(tasks_1.filter(task => task.id !== taskID))//10 ms
        //console.log(tasks_1)//работает асинхронно
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        const copyTasks = [...tasks_1]
        copyTasks.push(newTask)
        setTasks(copyTasks)
    }


    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks_1.map(task => task.id !== taskID ? task : {...task, isDone: isDone}))
    }

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const getTasksForTodoList = () => {
        switch (filter) {
            case "active":
                return tasks_1.filter(tasks_1 => !tasks_1.isDone)
            case "completed":
                return tasks_1.filter(tasks_1 => tasks_1.isDone)
            default:
                return tasks_1
        }
    }
    //UI
    return (
        <div className="App">
            <ToDoList
                title={todoListTitle_1}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
