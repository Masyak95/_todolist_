import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}


function App() {
    //BLL
    // const todoListTitle_1: string = "What to learn today"
    //
    // const [tasks_1, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML and CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    // ])
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    //
    const todoList_1 = v1()
    const todoList_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "What to learn today", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"},
        ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
        {id: v1(), title: "HTML and CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
        {id: v1(), title: "HTML and CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ]
    })


    const removeTask = (taskID: string, todoListID: string) => {
        const todoListsTasks = tasks[todoListID]
        const updatedTasks = todoListsTasks.filter(t => t.id !== taskID)
        const copyTask = {...tasks}
        copyTask[todoListID] = updatedTasks
        setTasks(copyTask)
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id:v1(), title: title, isDone: false}
        const todoListsTasks = tasks[todoListID]
        const updatedTasks = [newTask, ...todoListsTasks]
        const copyTask = {...tasks}
        copyTask[todoListID] = updatedTasks
        setTasks(copyTask)

    }


    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const todoListsTasks = tasks[todoListID]
        const updatedTasks = todoListsTasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        const copyTask = {...tasks}
        copyTask[todoListID] = updatedTasks
        setTasks(copyTask)
    }



    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
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
                filter={filter}
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
