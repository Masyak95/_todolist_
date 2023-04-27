import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: TodolistType
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)



// @ts-ignore
window.store = store
