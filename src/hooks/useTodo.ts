import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { todoApi } from '~/api/todo.api'

import type { TodoRequest, TodoSearchParams } from '~/types/todo'

export function useTodos(params: TodoSearchParams) {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => todoApi.getTodos(params)
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: TodoRequest) => todoApi.createTodo(body),

    onSuccess: () => {
      toast.success('Todo created successfully!')
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: TodoRequest }) =>
      todoApi.updateTodo(id, body),
    onSuccess: () => {
      toast.success('Todo updated successfully!')
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: () => {
      toast.success('Todo deleted successfully!')
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })
}
