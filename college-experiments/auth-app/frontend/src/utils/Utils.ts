import { toast, ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "top-center"
};

export const handleSuccess = (msg: string): void => {
  toast.success(msg, toastConfig);
};

export const handleError = (msg: string): void => {
  toast.error(msg, toastConfig);
};