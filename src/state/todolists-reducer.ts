import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistsActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistsActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistsTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistsFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistsActionType | AddTodolistsActionType | ChangeTodolistsTitleActionType | ChangeTodolistsFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [ ...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [ ...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistsActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistsActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistsTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}


export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistsFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
