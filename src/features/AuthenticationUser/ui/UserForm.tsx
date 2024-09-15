'use client';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { Box, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'firebase/auth';
import { schemaLogin, schemaRegister } from 'shared/constants';
import { DataFormLogin, DataFormRegister } from 'shared/types/form';
import { Button, Notification, Title } from 'shared/components';
import { logInUser, registerUser } from 'shared/lib/api';
import { Path } from 'shared/types/path';
import styles from './UserForm.module.scss';
import { useTranslation } from 'react-i18next';

interface FormProps {
  isLogin: boolean;
}

export const UserForm: FC<FormProps> = ({ isLogin }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [, setCookie] = useCookies<string>(['user']);
  const { control, handleSubmit, reset, formState } = useForm<
    DataFormLogin | DataFormRegister
  >({
    defaultValues: { email: '', password: '', name: '' },
    resolver: yupResolver<DataFormLogin | DataFormRegister>(
      isLogin ? schemaLogin(t) : schemaRegister(t)
    ),
    mode: 'all',
  });

  const onSubmit = async (
    data: DataFormLogin | DataFormRegister
  ): Promise<void> => {
    let res: User | string;

    if (!isLogin && 'name' in data) {
      res = await registerUser(data.name, data.email, data.password);
    } else {
      res = await logInUser(data.email, data.password);
    }

    if (typeof res === 'string') {
      setError(res);
      setTimeout(() => setError(null), 5000);
    } else {
      const { expirationTime } = await res.getIdTokenResult();
      setCookie('user', res, {
        expires: new Date(expirationTime),
      });
      router.push(Path.MAIN);
      reset();
    }
  };

  return (
    <div className={styles.containerUseForm}>
      {error && <Notification error={error} />}
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title>{!isLogin ? t('SignUp') : t('SignIn')}</Title>
        {!isLogin && (
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                data-testid={'nameInput'}
                color="secondary"
                error={!!error}
                margin="normal"
                required
                fullWidth
                label={t('Name')}
                {...field}
                sx={{ minHeight: '5rem' }}
                helperText={error?.message}
              />
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              data-testid={'emailInput'}
              color="secondary"
              error={!!error}
              margin="normal"
              required
              fullWidth
              label={t('Email')}
              {...field}
              sx={{ minHeight: '5rem' }}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              data-testid={'passwordInput'}
              color="secondary"
              error={!!error}
              margin="normal"
              required
              fullWidth
              label={t('Password')}
              type="password"
              {...field}
              sx={{ minHeight: '5rem' }}
              helperText={error?.message}
              autoComplete="true"
            />
          )}
        />
        <Button type={'submit'} size="lg" disabled={!formState.isValid}>
          {t('Submit')}
        </Button>
      </Box>
    </div>
  );
};
