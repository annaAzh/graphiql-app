import { Rubik, Rubik_Doodle_Shadow } from 'next/font/google';

export const rubik = Rubik({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const rubik_doodle = Rubik_Doodle_Shadow({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-rubik-doodle',
  weight: ['400'],
  display: 'swap',
  adjustFontFallback: false,
});
