import { ReactNode, createContext, useEffect, useState } from "react";
import { Theme } from "../types/common/theme";

export interface ThemeContextType{
    theme: Theme;
    setTheme(theme: Theme): void;
}

export const ThemeContext = createContext<ThemeContextType>({theme: "light", setTheme:()=>{}});

export default function ThemeProvider({children}: {children: ReactNode}){

    const [theme, setTheme] = useState<Theme>("light");
    const [isInitial, setIsInitial] = useState<boolean>(true);
    useEffect(()=>{
        if(isInitial) return;
        theme === "dark" ? 
            document.documentElement.classList.add("dark"):
            document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", theme);
    },[theme]);
    
    useEffect(()=>{
        let ls = localStorage.getItem("theme");
        if(ls)
            setTheme(ls as Theme);
        else
            localStorage.setItem("theme", "light");
        setIsInitial(false);
    },[]);

    return (
        <ThemeContext.Provider value = {{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};