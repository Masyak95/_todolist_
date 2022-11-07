import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    function removeTask(id: string, todolistID: string) {
        let tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistID] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistID]
        let newTasks = [task, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todoLists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todolistID1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"},
    ])

    let removeTodolist = (todolistID: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id != todolistID)
        setTodoLists(filteredTodolist)

        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    let [tasksObj, setTasksObj] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}]
    })


    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !!t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
