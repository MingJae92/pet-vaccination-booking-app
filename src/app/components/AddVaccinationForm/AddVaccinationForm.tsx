import React from 'react';
import { Button, TextField, Box } from '@mui/material';
import { formBoxSx } from '@/app/styles/AddVaccinationFormStyles/AddVaccinationFormStyles.styles';

const AddVaccinationForm = () => {
  return (
    <Box sx={formBoxSx}>
      <TextField label="Type" fullWidth margin="normal" />
      <TextField
        label="Last Completed Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Vaccination
      </Button>
    </Box>
  );
};

export default AddVaccinationForm;
