import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = "ADD-TODOLIST"
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"

export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
}

export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    filter: FilterValuesType
    id: string
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string
    id: string
}



type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

const todolistsReducer =
    (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newToDoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newToDoList]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id? {
                ...tl,
                filter: action.filter
            }: tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {
                ...tl,
                title: action.title
            } : tl)
        default:
            return todolists
    }
}
export default todolistsReducer

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: REMOVE_TODOLIST, id: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: ADD_TODOLIST, title})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT =>({type: CHANGE_TODOLIST_FILTER, filter, id})
export const ChangeTodoListTitleAC= (title: string, id: string): ChangeTodolistTitleAT=>({type: CHANGE_TODOLIST_TITLE, title, id})