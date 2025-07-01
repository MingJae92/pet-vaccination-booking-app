import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination,
} from '@mui/material';
import StatusBadge from '../StatusBadge/StatusBadge';
import { tableStyles } from '@/app/styles/VaccinationListStyles/VaccinationList.styles';
import type { Vaccination } from '@/app/page'; // Suggested better place for the type

const VaccinationList = ({ vaccinations }: { vaccinations: Vaccination[] }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table aria-label="vaccination list table" size="medium">
        <TableHead>
          <TableRow sx={tableStyles.headRow}>
            <TableCell sx={tableStyles.headCell}>Pet Name</TableCell>
            <TableCell sx={tableStyles.headCell}>Vaccination Type</TableCell>
            <TableCell sx={tableStyles.headCell}>Last Completed</TableCell>
            <TableCell sx={tableStyles.headCell}>Due Date</TableCell>
            <TableCell sx={tableStyles.headCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccinations
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((v) => (
              <TableRow key={v.id} sx={tableStyles.bodyRow}>
                <TableCell sx={tableStyles.bodyCell}>
                  <Typography noWrap>{v.petName}</Typography>
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  <Typography noWrap>{v.vaccinationType}</Typography>
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  {v.lastCompletedDate}
                </TableCell>
                <TableCell sx={tableStyles.bodyCell}>{v.dueDate}</TableCell>
                <TableCell sx={tableStyles.bodyCell}>
                  <StatusBadge status={v.status} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={vaccinations.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]} // Fixed to keep only 10
      />
    </TableContainer>
  );
};

export default VaccinationList;
