import { createContext } from "react";

export interface IToast {
    id?: number
    headerText: string
    message: string
    success: boolean,
}

export interface ToastsContextType {
    addToast: (toast :IToast) => void,
}

export const ToastContext = createContext<ToastsContextType | undefined>(undefined);