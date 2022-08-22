import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";


export type FilterValuesType = "all" | "active" | "completed"


function App() {
    //BLL
    const todoListTitle_1: string = "What to learn today"

    const [tasks_1, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML and CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const removeTask = (taskID: number) => {
        setTasks(tasks_1.filter(task => task.id !== taskID))//10 ms
        //console.log(tasks_1)//работает асинхронно
    }
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
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
