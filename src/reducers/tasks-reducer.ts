import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleStatusACType = ReturnType<typeof changeTitleStatusAC>


type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTitleStatusACType
    | AddTodoListAT
    | RemoveTodoListAT


const initialState: TasksStateType = {}
const tasksReducer =
    (state = initialState, action: ActionType) => {
        switch (action.type) {
            case "REMOVE-TASK":
                return {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId]
                        .filter(task => task.id !== action.payload.taskId)
                }
            case "ADD-TASK":
                return {
                    ...state,
                    [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},
                        ...state[action.payload.todolistId]]
                }
            case "CHANGE-STATUS-TASK":
                return {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId]
                        .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
                }
            case "CHANGE-TITLE-TASK":
                return {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId]
                        .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
                }
            case "ADD-TODOLIST":
                return {
                    ...state,
                    [action.todolistId]: []
                }
            case "REMOVE-TODOLIST":
                // let {[action.id]: [], ...rest} = {...state}
                let copyState = {...state}
                delete copyState[action.id]
                return copyState
            default:
               return state
        }
    }
export default tasksReducer

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", payload: {taskId, todolistId}} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-STATUS-TASK", payload: {taskId, isDone, todolistId}} as const
}

export const changeTitleStatusAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", payload: {taskId, title, todolistId}} as const
}

