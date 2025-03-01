import { SelectHTMLAttributes } from "react";

export default interface selectTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label?: string;
  className?: string;
}
