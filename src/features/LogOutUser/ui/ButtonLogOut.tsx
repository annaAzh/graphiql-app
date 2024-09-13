'use client';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from 'shared/components';
import { logoutUser } from 'shared/lib/api';
import { useRouter } from 'next/navigation';
import { Path } from 'shared/types/path';
import styles from './ButtonLogOut.module.scss';
import { useTranslation } from 'react-i18next';

export const ButtonLogOut = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [, , removeCookie] = useCookies<string>(['user']);
  const { t } = useTranslation();

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
        {t('SignOut')}
      </Button>
      <Dialog
        open={open}
        color="secondary"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('LogOutMessage')}</DialogTitle>
        <DialogActions>
          <Button variant="secondary" onClick={handleYesLogOut}>
            {t('Yes')}
          </Button>
          <Button className={styles.dialogBtnNo} onClick={handleNoLogOut}>
            {t('No')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
