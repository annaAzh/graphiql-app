'use client';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { redirect } from 'next/navigation';
import { Box, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'firebase/auth';
import { schemaLogin, schemaRegister } from 'shared/constants';
import { DataFormLogin, DataFormRegister } from 'shared/types/form';
import { Button, Notification, Title } from 'shared/components';
import { logInUser, registerUser } from 'shared/lib/api';
import { Path } from 'shared/types/path';
import styles from './UserForm.module.scss';

interface FormProps {
  isLogin: boolean;
}

export const UserForm: FC<FormProps> = ({ isLogin }) => {
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies<string>(['user']);
  const { control, handleSubmit, reset, formState } = useForm<
    DataFormLogin | DataFormRegister
  >({
    defaultValues: { email: '', password: '', name: '' },
    resolver: yupResolver<DataFormLogin | DataFormRegister>(
      isLogin ? schemaLogin : schemaRegister
    ),
    mode: 'all',
  });

  useEffect(() => {
    if (cookies) redirect(Path.MAIN);
  }, [cookies]);

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
      reset();
    }
  };

  return (
    <div className={styles.containerUseForm}>
      {error && <Notification error={error} />}
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title>{!isLogin ? 'Sign Up' : 'Sign In'}</Title>
        {!isLogin && (
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                color="secondary"
                error={!!error}
                margin="normal"
                required
                fullWidth
                label={'Name'}
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
              color="secondary"
              error={!!error}
              margin="normal"
              required
              fullWidth
              label={'Email'}
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
              color="secondary"
              error={!!error}
              margin="normal"
              required
              fullWidth
              label={'Password'}
              type="password"
              {...field}
              sx={{ minHeight: '5rem' }}
              helperText={error?.message}
              autoComplete="true"
            />
          )}
        />
        <Button type={'submit'} size="lg" disabled={!formState.isValid}>
          {'Submit'}
        </Button>
      </Box>
    </div>
  );
};
