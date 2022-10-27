import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask();
        }
    }


    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map((t) => {
                const onRemoveHandler = () => {
                    props.removeTask(t.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(t.id, newIsDoneValue)
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
