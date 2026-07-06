import React, { useState, useRef } from 'react'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'
import type { Todo } from '~/types/todo'
import { formatRelativeDate } from '~/utils/format'

interface TodoItemProps {
  todo: Todo
  onToggle: (todo: Todo) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete
}: TodoItemProps) {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDeleteClick = () => {
    if (!confirming) {
      setConfirming(true)
      timerRef.current = setTimeout(() => setConfirming(false), 3000)
      return
    }
    clearTimeout(timerRef.current)
    setConfirming(false)
    onDelete(todo.id)
  }

  const isDone = !!todo.completed

  return (
    <Card
      variant="outlined"
      sx={{
        p: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        bgcolor: isDone ? 'secondary.light' : 'background.paper',
        borderColor: 'divider',
        '&:hover': {
          boxShadow:
            '0 4px 10px rgba(30,27,46,.08), 0 2px 4px rgba(30,27,46,.06)',
          transform: 'translateY(-1px)'
        }
      }}
    >
      <Checkbox
        checked={isDone}
        onChange={() => onToggle(todo)}
        color="secondary"
        sx={{ mt: -0.25 }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            wordBreak: 'break-word',
            color: isDone ? 'text.secondary' : 'text.primary',
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: 'secondary.main'
          }}
        >
          {todo.title}
        </Typography>

        {todo.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, wordBreak: 'break-word' }}
          >
            {todo.description}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={2}
        //   flexWrap="wrap"
          sx={{ color: '#9298A8' }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <EventRoundedIcon sx={{ fontSize: 13 }} />
            <Typography variant="caption">
              Create: {formatRelativeDate(todo.createdAt)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <UpdateRoundedIcon sx={{ fontSize: 13 }} />
            <Typography variant="caption">
              Update: {formatRelativeDate(todo.updatedAt)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack direction="row" spacing={0.25}>
        <Tooltip title="Sửa">
          <IconButton size="small" onClick={() => onEdit(todo)}>
            <EditRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={confirming ? 'Click again to delete' : 'Delete'}>
          <IconButton
            size="small"
            onClick={handleDeleteClick}
            sx={{
              color: confirming ? '#fff' : 'text.secondary',
              bgcolor: confirming ? 'error.main' : 'transparent',
              '&:hover': {
                bgcolor: confirming ? 'error.dark' : 'error.light',
                color: confirming ? '#fff' : 'error.main'
              }
            }}
          >
            <DeleteRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  )
}
