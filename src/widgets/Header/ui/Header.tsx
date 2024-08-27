'use client';
import { FC } from 'react';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import { useRouter } from 'next/navigation';
import { MenuItem, Select } from '@mui/material';
import { Button, Title } from 'shared/components';
import './Header.scss';

export const Header: FC = () => {
  const router = useRouter();

  return (
    <header className="header">
      <Image
        src={Logo}
        alt="logo"
        priority
        width={210}
        height={65}
        onClick={() => router.push('/')}
      />
      <div className="selectorHeader">
        <Title text={'Language:'} />
        <Select
          color="secondary"
          labelId="select-label"
          id="select"
          defaultValue={'en'}
        >
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'ru'}>RU</MenuItem>
        </Select>
      </div>
      <div className="containerButtons">
        <Button onClick={() => router.push('/signUp')} size="lg">
          {'Sign Up'}
        </Button>
        <Button onClick={() => router.push('/signIn')} size="lg">
          {'Sign In'}
        </Button>
      </div>
    </header>
  );
};
