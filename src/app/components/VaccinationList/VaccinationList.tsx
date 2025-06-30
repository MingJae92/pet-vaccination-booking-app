import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import StatusBadge from '../StatusBadge/StatusBadge';
import { tableStyles } from '@/app/styles/VaccinationListStyles/VaccinationList.styles';

interface Vaccination {
  id: string;
  vaccinationType: string;    // changed from 'type'
  lastCompletedDate: string;  // changed from 'lastCompleted'
  dueDate: string;
  status: string;
}

const VaccinationList = ({ vaccinations }: { vaccinations: Vaccination[] }) => {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table aria-label="vaccination list table" size="medium" >
        <TableHead>
          <TableRow sx={tableStyles.headRow}>
            <TableCell sx={tableStyles.headCell}>Vaccination Type</TableCell>
            <TableCell sx={tableStyles.headCell}>Last Completed</TableCell>
            <TableCell sx={tableStyles.headCell}>Due Date</TableCell>
            <TableCell sx={tableStyles.headCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccinations.map((v) => (
            <TableRow key={v.id} sx={tableStyles.bodyRow}>
              <TableCell sx={tableStyles.bodyCell}>
                <Typography>{v.vaccinationType}</Typography>
              </TableCell>
              <TableCell sx={tableStyles.bodyCell}>{v.lastCompletedDate}</TableCell>
              <TableCell sx={tableStyles.bodyCell}>{v.dueDate}</TableCell>
              <TableCell sx={tableStyles.bodyCell}>
                <StatusBadge status={v.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VaccinationList;
