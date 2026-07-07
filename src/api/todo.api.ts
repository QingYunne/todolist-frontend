import axiosClient from './axios'
import type {
  Todo,
  TodoUpdateRequest,
  TodoCreateRequest,
  TodoSearchParams
} from '~/types/todo'
import type { PageResponse } from '~/types/page'

const PATH = '/todos'

export const todoApi = {
  getTodos(params: TodoSearchParams) {
    return axiosClient.get<PageResponse<Todo>>(PATH, { params })
  },

  createTodo(body: TodoCreateRequest) {
    return axiosClient.post<Todo>(PATH, body)
  },

  updateTodo(id: number, body: TodoUpdateRequest) {
    return axiosClient.patch<Todo>(`${PATH}/${id}`, body)
  },

  deleteTodo(id: number) {
    return axiosClient.delete<void>(`${PATH}/${id}`)
  }
}
