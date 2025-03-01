import React, { ForwardedRef, useId } from "react";
import { inputTypes } from "../types/inputTypes";
const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    ...props
  }: inputTypes,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
