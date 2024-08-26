'use client';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin, schemaRegister } from 'shared/constants';
import { DataFormLogin, DataFormRegister } from 'shared/types/form';
import { Button, Title } from 'shared/components';
import './UserForm.scss';

interface FormProps {
  isLogin: boolean;
}

export const UserForm: FC<FormProps> = ({ isLogin }) => {
  const { control, handleSubmit, reset, formState } = useForm<
    DataFormLogin | DataFormRegister
  >({
    defaultValues: { email: '', password: '', name: '' },
    resolver: yupResolver<DataFormLogin | DataFormRegister>(
      isLogin ? schemaLogin : schemaRegister
    ),
    mode: 'all',
  });

  const onSubmit = (data: DataFormLogin | DataFormRegister) => {
    console.log(data);
    reset();
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title text={!isLogin ? 'Sign Up' : 'Sign In'} />
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
  );
};
