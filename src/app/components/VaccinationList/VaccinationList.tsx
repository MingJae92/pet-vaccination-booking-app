'use client';

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

import StatusBadge from '../StatusBadge/StatusBadge';
import VaccinationModal from '@/app/components/VaccinationModal/VaccinationModel';
import { tableStyles } from '@/app/styles/VaccinationListStyles/VaccinationList.styles';
import type { Vaccination } from '@/app/page';

const VaccinationList = ({ vaccinations }: { vaccinations: Vaccination[] }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [selected, setSelected] = useState<Vaccination | null>(null);
  const [localVaccinations, setLocalVaccinations] = useState(vaccinations);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingEdit, setPendingEdit] = useState<Vaccination | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleView = (vaccination: Vaccination) => {
    setSelected(vaccination);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (vaccination: Vaccination) => {
    setSelected(vaccination);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/vaccinations/${deleteTargetId}`);
      setLocalVaccinations((prev) => prev.filter((v) => v._id !== deleteTargetId));
    } catch (error) {
      console.error('Failed to delete', error);
    } finally {
      setDeleteConfirmOpen(false);
      setDeleteTargetId(null);
      setIsDeleting(false);
    }
  };

  const handleSave = (updated: Vaccination) => {
    setPendingEdit(updated);
    setConfirmOpen(true);
  };

  const confirmSave = async () => {
    if (!pendingEdit) return;
    setIsSaving(true);
    try {
      const res = await axios.patch(`/api/vaccinations/${pendingEdit._id}`, pendingEdit);
      const updated = res.data;

      setLocalVaccinations((prev) =>
        prev.map((v) => (v._id === updated._id ? updated : v))
      );

      setModalOpen(false);
      setConfirmOpen(false);
      setPendingEdit(null);
    } catch (err) {
      console.error('Failed to save changes', err);
      setConfirmOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={tableStyles.container}>
        <Table aria-label="vaccination list table" size="medium">
          <TableHead>
            <TableRow sx={tableStyles.headRow}>
              <TableCell sx={tableStyles.headCell}>Pet Name</TableCell>
              <TableCell sx={tableStyles.headCell}>Vaccination Type</TableCell>
              <TableCell sx={tableStyles.headCell}>Last Completed</TableCell>
              <TableCell sx={tableStyles.headCell}>Due Date</TableCell>
              <TableCell sx={tableStyles.headCell}>Status</TableCell>
              <TableCell sx={tableStyles.headCell} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {localVaccinations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((v) => (
                <TableRow key={v._id} sx={tableStyles.bodyRow}>
                  <TableCell sx={tableStyles.bodyCell}>
                    <Typography noWrap>{v.petName}</Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.bodyCell}>
                    <Typography noWrap>{v.vaccinationType}</Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.bodyCell}>
                    {new Date(v.lastCompletedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={tableStyles.bodyCell}>
                    {new Date(v.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={tableStyles.bodyCell}>
                    <StatusBadge status={v.status} />
                  </TableCell>
                  <TableCell sx={tableStyles.bodyCell} align="center">
                    <Tooltip title="View">
                      <IconButton onClick={() => handleView(v)} size="small" disabled={isSaving || isDeleting}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(v)} size="small" disabled={isSaving || isDeleting}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(v._id)} size="small" color="error" disabled={isSaving || isDeleting}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={localVaccinations.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      <VaccinationModal
        open={modalOpen}
        mode={modalMode}
        data={selected}
        onClose={() => {
          if (!isSaving) setModalOpen(false);
        }}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Confirm Save Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => !isSaving && setConfirmOpen(false)}
      >
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save these changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={confirmSave} variant="contained" color="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => !isDeleting && setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is permanent. Are you sure you want to delete this vaccination record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} disabled={isDeleting}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VaccinationList;
