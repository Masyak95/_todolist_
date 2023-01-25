import React, {Reducer, useReducer} from 'react'
import './App.css'
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import TodoList from './TodoList';
import todolistsReducer, {
    addTodoListAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducerActionType
} from "./reducers/todolists-reducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./reducers/tasks-reducer";


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

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer<Reducer<Array<TodoListType>, todolistsReducerActionType>>(todolistsReducer,[
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title,todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId,isDone,todoListId))
    }

    const changeTaskTitle = (taskID: string, todoListId: string, title: string) => {
        dispatchToTasks(changeTitleStatusAC(taskID,todoListId,title))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(todoListId, filter))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListId))
    }
    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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

export default AppWithRedux;











