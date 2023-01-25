import React from 'react'
import './App.css'
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import TodoList from './TodoList';
import {addTodoListAC, changeTodoListTitleAC, removeTodoListAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import TodoListWithRedux from "./TodoListWithRedux";


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

function AppWithRedux() {

    let todoListID_1 = v1()
    let todoListID_2 = v1()

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title,todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId,isDone,todoListId))
    }

    const changeTaskTitle = (taskID: string, todoListId: string, title: string) => {
        dispatch(changeTitleStatusAC(taskID,todoListId,title))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListTitleAC(todoListId, filter))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }
    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
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

    const todoListsComponents = TodoList.length
        ? todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id],tl.filter)
            return (
                <Grid item key={tl.id}>
                    <Paper style={{padding: "20px"}} elevation={8}>
                        <TodoListWithRedux
                            tasks={filteredTasks}
                            todolist={tl}
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

export default AppWithRedux;











