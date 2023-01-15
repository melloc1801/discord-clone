import React from 'react';
import { Input, InputProps } from './Input';
import classNames from 'classnames';

type FieldProps = InputProps & {
  label: string;
  required?: boolean;
  error?: string;
};
export const Field: React.FC<FieldProps> = ({
  label,
  required = false,
  error,
  ...inputProps
}) => {
  const commonLabelStyles = 'flex items-start mb-2 text-xs font-bold';

  return (
    <div>
      <label
        className={classNames(
          { 'text-discord-red-300': error },
          commonLabelStyles
        )}
        htmlFor=""
      >
        {error ? (
          <>
            <div className="uppercase">{label}</div>
            <span className="mx-1 inline-block">-</span>
            <div className="italic font-normal">{error}</div>
          </>
        ) : (
          <>
            <div className="text-discord-gray-300 uppercase">{label}</div>
            {required ? (
              <div className="ml-1 text-discord-red-500 font-normal">*</div>
            ) : null}
          </>
        )}
      </label>
      <Input {...inputProps} />
    </div>
  );
};
