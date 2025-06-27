import React from 'react';
import { ButtonGroup, Button, Box } from '@mui/material';
import { groupBoxSx } from '@/app/styles/StatusFilter/StatusFilter.styles';

const StatusFilter = ({ onFilter }: { onFilter: (status: string) => void }) => {
  return (
    <Box sx={groupBoxSx}>
      <ButtonGroup>
        <Button onClick={() => onFilter('all')}>All</Button>
        <Button onClick={() => onFilter('overdue')}>Overdue</Button>
        <Button onClick={() => onFilter('due soon')}>Due Soon</Button>
        <Button onClick={() => onFilter('completed')}>Completed</Button>
      </ButtonGroup>
    </Box>
  );
};

export default StatusFilter;
