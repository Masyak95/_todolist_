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
    todolistId: string
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



export type todolistsReducerActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


const initialState: Array<TodoListType> = []
const todolistsReducer =
    (state = initialState, action: todolistsReducerActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":

            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-FILTER":{
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist){
                todolist.filter = action.filter
            }
            return [...state]
        }

        case "CHANGE-TODOLIST-TITLE":{
            const todolists = state.find(tl => tl.id === action.id)
            if (todolists) {
                todolists.title = action.title;
            }
            return [...state]
        }
        default:
            return state
    }
}
export default todolistsReducer

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({type: REMOVE_TODOLIST, id: id})
export const addTodoListAC = (title: string): AddTodoListAT => ({type: ADD_TODOLIST, title, todolistId: v1()})
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT =>({type: CHANGE_TODOLIST_FILTER, filter, id})
export const changeTodoListTitleAC= (title: string, id: string): ChangeTodolistTitleAT=>({type: CHANGE_TODOLIST_TITLE, title, id})
