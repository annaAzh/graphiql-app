'use client';

import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { FC, useState } from 'react';

interface NotificationProps {
  error: string;
}

export const Notification: FC<NotificationProps> = ({ error }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ mt: '8rem' }}
    >
      <Alert
        color="error"
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
