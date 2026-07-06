import axiosClient from "./axios"
import type {
    Todo,
  TodoRequest,
  TodoSearchParams,
} from "~/types/todo"
import type {PageResponse} from "~/types/page"

const PATH = "/todos"

export const todoApi = {
    getTodos(params: TodoSearchParams) {
        return axiosClient.get<PageResponse<Todo>>(PATH, { params })
    },

    createTodo(body: TodoRequest) {
        return axiosClient.post<Todo>(PATH, body)
    },

    updateTodo(id: number, body: TodoRequest) {
        return axiosClient.patch<Todo>(`${PATH}/${id}`, body)
    },

    deleteTodo(id: number) {
        return axiosClient.delete<void>(`${PATH}/${id}`)
    }
}