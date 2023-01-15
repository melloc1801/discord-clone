import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const styles = classNames(
    className,
    'p-3 w-full font-medium text-white bg-discord-purple-500'
  );

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};
