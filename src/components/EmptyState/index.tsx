import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'

export default function EmptyState({ filtered } : { filtered : boolean}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 7,
        px: 3,
        bgcolor: 'background.paper',
        borderRadius: 4,
        border: '1.5px dashed',
        borderColor: 'divider',
      }}
    >
      <TaskAltRoundedIcon sx={{ fontSize: 52, color: 'primary.main', opacity: 0.8, mb: 1.5 }} />
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {filtered ? "Haven't found any matching tasks" : "No tasks yet"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {filtered ? 'Try changing the search term or filters.' : 'Press the + button to add your first task.'}
      </Typography>
    </Box>
  );
}
