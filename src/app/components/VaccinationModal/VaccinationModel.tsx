'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';
import StatusBadge from '../StatusBadge/StatusBadge';
import type { Vaccination } from '@/app/page';

interface Props {
  open: boolean;
  mode: 'view' | 'edit';
  data: Vaccination | null;
  onClose: () => void;
  onSave: (updated: Vaccination) => void;
  isSaving?: boolean;
}

const VaccinationModal = ({ open, mode, data, onClose, onSave, isSaving = false }: Props) => {
  const [formState, setFormState] = useState<Vaccination | null>(data);

  useEffect(() => {
    setFormState(data);
  }, [data]);

  const handleChange = (field: keyof Vaccination) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formState) return;
    setFormState({ ...formState, [field]: e.target.value });
  };

  const handleSave = () => {
    if (formState) onSave(formState);
  };

  if (!formState) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === 'view' ? 'Vaccination Details' : 'Edit Vaccination'}
      </DialogTitle>

      <DialogContent dividers>
        {mode === 'view' ? (
          <>
            <Typography><strong>Pet Name:</strong> {formState.petName}</Typography>
            <Typography><strong>Vaccination Type:</strong> {formState.vaccinationType}</Typography>
            <Typography><strong>Last Completed:</strong> {formState.lastCompletedDate}</Typography>
            <Typography><strong>Due Date:</strong> {formState.dueDate}</Typography>
            <Box mt={2}>
              <StatusBadge status={formState.status} />
            </Box>
          </>
        ) : (
          <>
            <TextField
              label="Pet Name"
              value={formState.petName}
              onChange={handleChange('petName')}
              fullWidth
              margin="normal"
              disabled={isSaving}
            />
            <TextField
              label="Vaccination Type"
              value={formState.vaccinationType}
              onChange={handleChange('vaccinationType')}
              fullWidth
              margin="normal"
              disabled={isSaving}
            />
            <TextField
              label="Last Completed Date"
              type="date"
              value={formState.lastCompletedDate}
              onChange={handleChange('lastCompletedDate')}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={isSaving}
            />
            <TextField
              label="Due Date"
              type="date"
              value={formState.dueDate}
              onChange={handleChange('dueDate')}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={isSaving}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>Cancel</Button>
        {mode === 'edit' && (
          <Button onClick={handleSave} variant="contained" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VaccinationModal;
