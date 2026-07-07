import Container from '@mui/material/Container'
import Header from './components/Header/Header'
import { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

import FilterToolbar from './components/FilterToolBar'
import EmptyState from './components/EmptyState'
import TodoDialog from './components/TodoDialog'
import TodoItem from './components/TodoItem'
import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo
} from './hooks/useTodo'
import type { Todo, TodoCreateRequest, TodoSearchParams } from './types/todo'

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [filters, setFilters] = useState<TodoSearchParams>({
    keyword: '',
    completed: undefined,
    sortBy: 'createdAt',
    direction: 'desc'
  })

  const [page, setPage] = useState(0)
  const size = 10

  const { data, isLoading, error } = useTodos({
    ...filters,
    page,
    size
  })

  const createMutation = useCreateTodo()
  const updateMutation = useUpdateTodo()
  const deleteMutation = useDeleteTodo()

  const handleOpenCreate = () => {
    setEditingTodo(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setDialogOpen(true)
  }

  const handleSaveTodo = async (body: TodoCreateRequest) => {
    if (editingTodo) {
      await updateMutation.mutateAsync({
        id: editingTodo.id,
        body
      })
    } else {
      await createMutation.mutateAsync(body)
    }

    setDialogOpen(false)
  }

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id)
  }

  const handleToggle = async (todo: Todo) => {
    await updateMutation.mutateAsync({
      id: todo.id,
      body: {
        completed: !todo.completed
      }
    })
  }

  const completedTaskNumber = () => {
    return data?.items?.filter((t: Todo): boolean => t.completed).length ?? 0
  }

  const completedPercent = () => {
    return data?.items.length
      ? Math.round((completedTaskNumber() / data.items.length) * 100)
      : 0
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, pb: 14 }}>
      <Header
        total={data?.totalElements ?? 0}
        completedCount={completedTaskNumber()}
        ringPercent={completedPercent()}
      />

      <FilterToolbar
        filters={filters}
        onChange={(next) => {
          setPage(0)
          setFilters(next)
        }}
      />

      <Stack spacing={1.25}>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={78}
              sx={{ borderRadius: 4 }}
            />
          ))}

        {!isLoading && !error && data && data.items.length === 0 && (
          <EmptyState filtered={!!(filters.keyword || filters.completed)} />
        )}

        {!isLoading &&
          !error &&
          data &&
          data.items.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
      </Stack>

      {!isLoading && data && data.totalElements > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            gap: 1
          }}
        >
          <Pagination
            page={page + 1}
            count={data.totalPages}
            onChange={(_, p) => setPage(p - 1)}
            shape="rounded"
            color="primary"
          />
          <Typography variant="caption" color="text.secondary">
            Page {page + 1} / {data.totalPages} • {data.totalElements} tasks
          </Typography>
        </Box>
      )}

      <Fab
        color="primary"
        onClick={handleOpenCreate}
        sx={{ position: 'fixed', right: 24, bottom: 28 }}
      >
        <AddRoundedIcon />
      </Fab>
      <TodoDialog
        open={dialogOpen}
        todo={editingTodo}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveTodo}
      />
    </Container>
  )
}

export default App
