import React, { forwardRef, InputHTMLAttributes } from "react";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
}

export const Input: React.FC<PropsWithChildren<Props>> = forwardRef<
  HTMLInputElement,
  Props
>((props, ref) => {
  const { label, className, inputClassName, ...inputProps } = props;

  return (
    <div className={twMerge("flex flex-col", className)}>
      <label>{label}</label>
      <input
        className={twMerge(
          "w-8 px-2 py-2 text-sm border text-light-blue border-bright-blue rounded-xl",
          inputClassName
        )}
        {...inputProps}
        ref={ref}
      />
    </div>
  );
});