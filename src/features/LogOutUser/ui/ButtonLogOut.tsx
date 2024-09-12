'use client';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from 'shared/components';
import { logoutUser } from 'shared/lib/api';
import { useRouter } from 'next/navigation';
import { Path } from 'shared/types/path';
import styles from './ButtonLogOut.module.scss';

export const ButtonLogOut = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [, , removeCookie] = useCookies<string>(['user']);

  const onClickLogOut = () => {
    setOpen(true);
  };

  const handleNoLogOut = () => {
    setOpen(false);
  };

  const handleYesLogOut = () => {
    removeCookie('user');
    logoutUser();
    router.push(Path.MAIN);
  };

  return (
    <>
      <Button size="lg" onClick={onClickLogOut}>
        Sign Out
      </Button>
      <Dialog
        open={open}
        color="secondary"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you really want to log out?'}
        </DialogTitle>
        <DialogActions>
          <Button variant="secondary" onClick={handleYesLogOut}>
            Yes
          </Button>
          <Button className={styles.dialogBtnNo} onClick={handleNoLogOut}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
