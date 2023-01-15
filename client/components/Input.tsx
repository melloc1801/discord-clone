import React, { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {};
export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="p-2.5 bg-discord-gray-900 outline-0 w-full rounded text-discord-gray-100"
      {...props}
    />
  );
};
