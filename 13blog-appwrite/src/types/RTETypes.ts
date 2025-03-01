import { Control } from "react-hook-form";

export default interface RTETypes {
  name?: string;
  control: Control<any>;
  label?: string;
  defaultValue?: string;
}
