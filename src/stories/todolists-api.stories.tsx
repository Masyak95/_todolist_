import axios from 'axios'
import React, {useEffect, useState} from 'react'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3f008601-6fa7-442c-b0b3-7962407e1df9'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
    const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        promise.then( (res)=>{
                setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

