import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function notifySuccess(message) {
  toast.success(message);
}

export function notifyError(message) {
  toast.error(message);
}

// Bu komponentni App.js yoki eng yuqori komponentda bitta marta qo'yish kerak
export default function Toast() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}
