'use client';
import { useTranslation } from 'react-i18next';
import Anna from 'shared/assets/img/anna.webp';
import Andrew from 'shared/assets/img/andrew.webp';
import Irina from 'shared/assets/img/irina.webp';
import styles from './InfoSection.module.scss';
import { ProfileCard } from 'shared/components/ProfileCard/ProfileCard';
import { Title } from 'shared/components';
import Link from 'next/link';

const NamesDevelopers: string[] = ['Anna', 'Andrew', 'Irina'];
const ImageDevelopers: string[] = [Anna, Andrew, Irina];

export const InfoSection = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.infoSection}>
      <Title>
        {t('DescriptionMainPage')}{' '}
        <Link href={'https://rs.school/'}>RS School</Link>
      </Title>
      <div className={styles.profileList}>
        {NamesDevelopers.map((dev: string, index: number) => {
          return (
            <ProfileCard name={dev} src={ImageDevelopers[index]} key={index} />
          );
        })}
      </div>
    </section>
  );
};
