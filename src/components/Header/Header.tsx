import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded'

interface HeaderProps {
  total: number
  completedCount: number
  ringPercent: number
}

export default function Header({
  total,
  completedCount,
  ringPercent
}: HeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Stack direction="row" alignItems="center" spacing={1.75}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={52}
            thickness={4.5}
            sx={{ color: 'divider', position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={ringPercent}
            size={52}
            thickness={4.5}
            sx={{
              color: 'primary.main',
              '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="caption" fontWeight={700} color="primary.main">
              {ringPercent}%
            </Typography>
          </Box>
        </Box>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <ChecklistRtlRoundedIcon
              sx={{ color: 'primary.main', fontSize: 22 }}
            />
            <Typography variant="h5">My Tasks</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {total === 0
              ? 'No tasks yet'
              : `${completedCount}/${total} tasks completed`}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
