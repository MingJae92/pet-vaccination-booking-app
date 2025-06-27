import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StatusBadge from '@/app/components/StatusBadge/StatusBadge';
import { cardSx, badgeBoxSx } from '@/app/styles/VaccinationCardStyles/VaccinationCardStyles.styles';

interface Props {
  type: string;
  lastCompleted: string;
  dueDate: string;
  status: string;
}

const VaccinationCard = ({ type, lastCompleted, dueDate, status }: Props) => {
  return (
    <Card sx={cardSx}>
      <CardContent>
        <Typography variant="h6">{type}</Typography>
        <Typography variant="body2">Last Completed: {lastCompleted}</Typography>
        <Typography variant="body2">Due: {dueDate}</Typography>
        <Box sx={badgeBoxSx}>
          <StatusBadge status={status} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VaccinationCard;
