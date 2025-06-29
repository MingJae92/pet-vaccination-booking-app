import { Chip } from '@mui/material';

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  completed: 'success',
  'due soon': 'warning',
  overdue: 'error',
};

const StatusBadge = ({ status }: { status?: string }) => {
  const safeStatus = status?.toLowerCase?.() ?? '';
  const color = statusColors[safeStatus] || 'default';

  return (
    <Chip label={status ?? 'Unknown'} color={color} size="small" />
  );
};

export default StatusBadge;
