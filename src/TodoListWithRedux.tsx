import React, {ChangeEvent} from "react"
import {FilterValuesType, TaskType, TodoListType} from "./App"
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeTodoListTitleAC, removeTodoListAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./reducers/tasks-reducer";

type TodoListWithReduxPropsType = {
    todolist: TodoListType
    tasks:  Array<TaskType>
}


const TodoListWithRedux = ({todolist, tasks}: TodoListWithReduxPropsType) => {

    const {id, title, filter} = todolist

 /*   let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }
*/
    const dispatch = useDispatch()
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }

    const removeTodoList = () => {
        let action = removeTodoListAC(id)
        dispatch(action)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title))
    }


    const tasksJSXItemsList = tasks?.length
        ? <List>
            {
                tasks.map((task) => {
                    const removeTask = () => dispatch(removeTaskAC(task.id, id))
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id))
                    const changeTaskTitle = (nextTitle: string) => {
                        dispatch(changeTitleStatusAC(task.id, nextTitle, id))
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

    const btnStyle = {marginRight: "2px"}

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => {
            dispatch(changeTodoListTitleAC(id, filter))
        }
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
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
                    color={filter === "all" ? "secondary" : "primary"}
                    onClick={changeFilterHandlerCreator("all")}
                >All
                </Button>
                <Button
                    style={btnStyle}
                    size="small"
                    variant="outlined"
                    color={filter === "active" ? "secondary" : "primary"}
                    onClick={changeFilterHandlerCreator("active")}
                >Active
                </Button>
                <Button
                    style={btnStyle}
                    size="small"
                    variant="outlined"
                    color={filter === "completed" ? "secondary" : "primary"}
                    onClick={changeFilterHandlerCreator("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoListWithRedux

