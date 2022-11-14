import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }


    return <div>
        <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
        // @ts-ignore
       <AddItemForm addItem={props.addTask} id={props.id}/>
        <ul>
            {props.tasks.map((t) => {
                const onRemoveHandler = () => {
                    props.removeTask(t.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                }
                return (
                    <li key={t.id}
                        className={t.isDone ? "is-done" : ""}
                    >
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button
                onClick={onAllClickHandler}
                className={props.filter === "all" ? "active-filter" : ""}

            >All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === "active" ? "active-filter" : ""}
            >Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === "completed" ? "active-filter" : ""}
            >Completed
            </button>
        </div>
    </div>
}

