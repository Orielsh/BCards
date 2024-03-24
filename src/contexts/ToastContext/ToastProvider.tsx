import { ReactNode, useState } from "react";
import { IToast, ToastContext } from "./ToastContext";
import "./ToastContainer.css";
export default function ToastProvider({ children }: { children: ReactNode }) {

    const [toastList, setToastList] = useState<IToast[]>([]);

    const addToast = (toast: IToast) => {
        const newToast: IToast = { ...toast, id: Date.now() };
        setToastList([...toastList, newToast]);
        setTimeout(() => {
            setToastList((prevToastList)=> prevToastList.filter((toast)=> toast.id !== newToast.id));
        }, 8000);
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="ToastContainer">
                {toastList.map((toast) => (
                    <div className={`toast ${!toast.success ?? "error"}`} key={toast.id}>
                        <h5>{toast.headerText}</h5>
                        <p>{toast.message}</p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
};