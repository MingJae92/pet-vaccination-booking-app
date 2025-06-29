import React from 'react';
import { Grid } from '@mui/material';
import VaccinationCard from '@/app/components/VaccinationCard/VaccinationCard';
import { gridSx } from '@/app/styles/VaccinationListStyles/VaccinationList.styles';

interface Vaccination {
  id: string;
  type: string;
  lastCompleted: string;
  dueDate: string;
  status: string;
}

const VaccinationList = ({ vaccinations }: { vaccinations: Vaccination[] }) => {
    
  return (
    <Grid container sx={gridSx}>
      {vaccinations.map((v) => (
        <VaccinationCard
          key={v.id}
          type={v.type}
          lastCompleted={v.lastCompleted}
          dueDate={v.dueDate}
          status={v.status}
        />
      ))}
    </Grid>
  );
};

export default VaccinationList;
