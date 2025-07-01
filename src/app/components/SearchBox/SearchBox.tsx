import React from 'react';
import { TextField, Paper } from '@mui/material';
import { tableStyles } from '@/app/styles/VaccinationListStyles/VaccinationList.styles';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBox = ({ searchTerm, onSearchChange }: SearchBoxProps) => {
  return (
    <Paper sx={{ ...tableStyles.container, mb: 2, p: 2 }}>
      <TextField
        label="Search by pet name or vaccine type"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Paper>
  );
};

export default SearchBox;
