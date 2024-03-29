import React from "react";
import { Toast, ToastCloseButton, ToastHeader } from "@chakra-ui/toast";


const CustomToast = ({ title, description, status = "info", isOpen, onClose }) => {
  return (
    <Toast isOpen={isOpen} variant={status} status={status} duration={5000} onDelete={onClose}>
      <ToastHeader>
        {title}
        <ToastCloseButton onClick={onClose} />
      </ToastHeader>
      <Toast.Body>{description}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;