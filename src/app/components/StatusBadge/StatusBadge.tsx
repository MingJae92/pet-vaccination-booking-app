// components/StatusBadge/StatusBadge.tsx
import React from 'react';
import { Chip } from '@mui/material';
import { VaccinationStatus } from '@/app/page'; 

const getColor = (status: VaccinationStatus) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'due soon':
      return 'warning';
    case 'overdue':
      return 'error';
    default:
      return 'default';
  }
};

const StatusBadge = ({ status }: { status: VaccinationStatus }) => (
  <Chip label={status.toUpperCase()} color={getColor(status)} variant="outlined" />
);

export default StatusBadge;
