import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import type { TodoSearchParams } from '~/types/todo'

interface FilterToolbarProps {
  filters: TodoSearchParams
  onChange: (filters: TodoSearchParams) => void
}
export default function FilterToolbar({
  filters,
  onChange
}: FilterToolbarProps) {
  const handle = (key: keyof TodoSearchParams) => (e: any) =>
    onChange({ ...filters, [key]: e.target.value })

  const handleCompleted = (e: SelectChangeEvent) =>
    onChange({
      ...filters,
      completed: e.target.value === '' ? undefined : e.target.value === 'true'
    })
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      sx={{ mb: 2.5 }}
    >
      <TextField
        placeholder="Search by title or description..."
        value={filters.keyword}
        onChange={handle('keyword')}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon
                sx={{ color: 'text.secondary', fontSize: 20 }}
              />
            </InputAdornment>
          ),
          sx: { borderRadius: 999, bgcolor: 'background.paper' }
        }}
      />

      <FormControl sx={{ minWidth: 140 }}>
        <Select
          size="small"
          displayEmpty
          value={
            filters.completed == undefined ? '' : String(filters.completed)
          }
          onChange={handleCompleted}
          sx={{ borderRadius: 999, bgcolor: 'background.paper' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="false">Pending</MenuItem>
          <MenuItem value="true">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }}>
        <Select
          size="small"
          value={filters.sortBy}
          onChange={handle('sortBy')}
          sx={{ borderRadius: 999, bgcolor: 'background.paper' }}
        >
          <MenuItem value="createdAt">Created Date</MenuItem>
          <MenuItem value="updatedAt">Updated Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 130 }}>
        <Select
          size="small"
          value={filters.direction}
          onChange={handle('direction')}
          sx={{ borderRadius: 999, bgcolor: 'background.paper' }}
        >
          <MenuItem value="desc">Descending</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
