import React from 'react';
import { Chip } from '@mui/material';

const statusColors: Record<string, "success" | "warning" | "error" | "default"> = {
  completed: 'success',
  'due soon': 'warning',
  overdue: 'error',
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = statusColors[status.toLowerCase()] || 'default';

  return (
    <Chip
      label={status}
      color={color}
      variant="outlined"
      size="small"
    />
  );
};

export default StatusBadge;
