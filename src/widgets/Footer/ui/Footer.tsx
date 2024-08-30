import Image from 'next/image';
import Link from 'next/link';
import LogoGitW from 'shared/assets/svg/github_logo_w.svg';
import LogoGitM from 'shared/assets/svg/github_logo_m.svg';
import LogoRSS from 'shared/assets/svg/rss-logo.svg';
import styles from './Footer.module.scss';
import { Title } from 'shared/components';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerGitLogo}>
        <Link href="https://github.com/annaAzh">
          <Image src={LogoGitW} alt="Anna" width={55} height={55} />
        </Link>
        <Link href="https://github.com/rRedq">
          <Image src={LogoGitM} alt="Andrei" width={55} height={55} />
        </Link>
        <Link href="https://github.com/IrinaFileva">
          <Image src={LogoGitW} alt="Irina" width={55} height={55} />
        </Link>
      </div>
      <Title text={'2024'} />
      <Link href="https://rs.school/courses/reactjs">
        <Image src={LogoRSS} alt="logoRSS" width={55} height={55} />
      </Link>
    </footer>
  );
};
