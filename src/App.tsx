import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";


function App() {
    //BLL
    const todoListTitle_1: string = "What to learn today"
    const todoListTitle_2: string = "What to learn next week"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML and CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 4, title: "English", isDone: false},
        {id: 5, title: "German", isDone: false},
        {id: 6, title: "Russian", isDone: false}
    ]
    //UI
    return (
        <div className="App">
            <ToDoList
                title={todoListTitle_1}
                tasks={tasks_1} />
            <ToDoList
                title={todoListTitle_2}
                tasks={tasks_2} />
        </div>
    );
}

export default App;
