'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/components';
import './Header.scss';

export const Header: FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? 'header scrollHeader' : 'header'}>
      <Image
        src={Logo}
        alt="logo"
        priority
        width={210}
        height={65}
        onClick={() => router.push('/')}
      />
      <div className="dashboard">
        <select className="selectLocale" defaultValue={'en'}>
          <option value={'en'}>EN</option>
          <option value={'ru'}>RU</option>
        </select>
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
