'use client';
import { FC } from 'react';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import { MenuItem, Select } from '@mui/material';
import { Title } from 'shared/components';
import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <Image src={Logo} alt="logo" priority width={210} height={65} />
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
    </header>
  );
};
