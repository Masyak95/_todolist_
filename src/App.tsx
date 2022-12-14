import React, {useState} from 'react'
import './App.css'
import TodoList from "./TodoList"
import {v1} from "uuid";
import todoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Cola", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter(t => t.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        //
    }
    const addTask = (title: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const resultOfUpdate: Array<TaskType> = [...tasksForUpdate, newTask]
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
    }
    // const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newToDoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newToDoList])
        setTasks({...tasks,[newTodoListId]:[]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
    }
    const changeTaskTitle = (taskID: string, todoListId: string, title: string) => {
        debugger
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.map(t => t.id === taskID ? {...t, title: title} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }



    const todoListsComponents = todoList.length
        ? todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id],tl.filter)
            return (
                <Grid item key={tl.id}>
                    <Paper style={{padding: "20px"}} elevation={8}>
                        <TodoList
                            todoListId={tl.id}
                            title={tl.title}
                            tasks={filteredTasks}
                            filter={tl.filter}

                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )
        :<span>Create your first TodoList</span>

    //GUI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{paddingTop: "20px"}}>
                <Grid container><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={4}>{todoListsComponents}</Grid>
            </Container>
        </div>
    );
}

export default App;











