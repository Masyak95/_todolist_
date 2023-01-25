import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List} from "@material-ui/core";
import { DeleteOutlineOutlined } from '@material-ui/icons';

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <List>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const changeTaskTitle = (nextTitle: string) => {
                        props.changeTaskTitle(task.id, props.todoListId, nextTitle)
                    }
                    const isDoneClass = task.isDone ? "isDone" : ""

                    return (
                        <li key={task.id} className={isDoneClass}>
                            <Checkbox
                                size={"small"}
                                color={"primary"}
                                checked={task.isDone}
                                onChange={changeTaskStatus}
                            />
                            <EditableSpan title={task.title}
                                        changeTitle={changeTaskTitle}
                            />
                            <IconButton aria-label="delete" onClick={removeTask}>
                                <DeleteOutlineOutlined/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </List>
        : <span>Your list is empty</span>


    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => {
            props.changeTodoListFilter(filter, props.todoListId)
        }
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)
    // const allBtnClass = props.filter === "all" ? "btn-active" : ""
    // const activeBtnClass = props.filter === "active" ? "btn-active" : ""
    // const completedBtnClass = props.filter === "completed" ? "btn-active" : ""
    const btnStyle = {marginRight: "2px"}
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={removeTodoList}>
                    <DeleteOutlineOutlined/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksJSXItemsList}
            <div>
                <Button
                    style={btnStyle}
                    size="small"
                    variant="outlined"
                    color={props.filter === "all" ? "secondary" : "primary"}
                    // className={allBtnClass}
                    onClick={changeFilterHandlerCreator("all")}
                >All
                </Button>
                <Button
                    style={btnStyle}
                    size="small"
                    variant="outlined"
                    color={props.filter === "active" ? "secondary" : "primary"}
                    // className={activeBtnClass}
                    onClick={changeFilterHandlerCreator("active")}
                >Active
                </Button>
                <Button
                    style={btnStyle}
                    size="small"
                    variant="outlined"
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    // className={completedBtnClass}
                    onClick={changeFilterHandlerCreator("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;