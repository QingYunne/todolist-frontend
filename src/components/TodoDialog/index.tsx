import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ErrorCode } from '~/constants/errorCode'
import { Validation } from '~/constants/validation'
import type { Todo, TodoRequest } from '~/types/todo'
import { toFieldErrors } from '~/utils/format'

interface TodoDialogProps {
  open: boolean
  todo: Todo | null
  onClose: () => void
  onSave: (body: TodoRequest) => Promise<void>
}

export default function TodoDialog({
  open,
  todo,
  onClose,
  onSave
}: TodoDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(todo?.title || '')
      setDescription(todo?.description || '')
      setErrors({})
      setSaving(false)
    }
  }, [open, todo])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = 'Title must not be blank'
    } else if (title.trim().length > Validation.title.max) {
      newErrors.title = `Title must not exceed ${Validation.title.max} characters`
    }

    if (description.length > Validation.description.max) {
      newErrors.description = `Description must not exceed ${Validation.description.max} characters`
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setSaving(true)

    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || null
      })
    } catch (error: any) {
      if (error.code === ErrorCode.VALIDATION_ERROR) {
        setErrors(toFieldErrors(error.result))
        return
      }
    } finally {
      setSaving(false)
    }
  }


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{todo ? 'Update todo' : 'Add new todo'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2.25} sx={{ mt: 0.5 }}>
          <TextField
            label="Title"
            placeholder="VD: Study Spring Boot"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)

              if (errors.title) {
                setErrors((prev) => ({
                  ...prev,
                  title: ''
                }))
              }
            }}
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            fullWidth
          />
          <TextField
            label="Description (optional)"
            placeholder="Job details..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)

              if (errors.description) {
                setErrors((prev) => ({
                  ...prev,
                  description: ''
                }))
              }
            }}
            multiline
            minRows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
