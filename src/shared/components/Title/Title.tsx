import clsx from 'clsx';
import React, { ReactNode } from 'react';

type TitleSize = 'h5' | 'h4' | 'h3' | 'h2' | 'h1';

interface Props {
  children: ReactNode;
  size?: TitleSize;
  className?: string;
}

const sizeToTagMap: Record<TitleSize, React.ElementType> = {
  h5: 'h5',
  h4: 'h4',
  h3: 'h3',
  h2: 'h2',
  h1: 'h1',
};

const sizeToClassNameMap: Record<TitleSize, string> = {
  h5: 'text-h5',
  h4: 'text-h4',
  h3: 'text-h3',
  h2: 'text-h2',
  h1: 'text-h1',
};

export const Title: React.FC<Props> = ({
  children,
  size = 'h2',
  className,
}) => {
  const Tag = sizeToTagMap[size];
  const sizeClassName = sizeToClassNameMap[size];

  return <Tag className={clsx(sizeClassName, className)}>{children}</Tag>;
};
