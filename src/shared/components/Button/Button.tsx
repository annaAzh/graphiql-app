import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

export const Button: FC<Props> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <button
      className={`${className} ${buttonClass}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
