import React from 'react';
import { Typography, Box } from '@mui/material';
import { petHeaderBoxSx } from '@/app/styles/PetHearder/PetHeader.styles'

const PetHeader = ({ petName }: { petName: string }) => {
  return (
    <Box sx={petHeaderBoxSx}>
      <Typography variant="h4">{petName}’s Vaccinations</Typography>
    </Box>
  );
};

export default PetHeader;
