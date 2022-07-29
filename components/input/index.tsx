import classNames from 'classnames';
import React from 'react';
import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  type: string;
  required: boolean;
  placeholder: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  value: string;
  className?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef(
  (
    {
      type,
      required,
      placeholder,
      value,
      changeHandler,
      error,
      className,
      wrapperClassName,
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={twMerge(wrapperClassName, 'transition-all')}>
        <input
          className={classNames(
            twMerge(
              'border shadow-inner bg-gray-200 rounded px-3 py-2 w-full text-sm focus:outline-jira-blue focus:bg-white',
              className
            ),
            {
              'border-red-500': !!error,
            }
          )}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={changeHandler}
          ref={ref}
        />
        {error ? (
          <p className="text-xs font-semibold ml-1 text-red-500 mt-1 text-left">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'InputElement';
