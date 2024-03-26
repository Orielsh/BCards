import { ReactNode, useEffect, useState } from "react";
import { IUserLoginDetails } from "../../interfaces/user/IUser";
import { getTokenFromLS, removeTokenFromLS } from "../../services/AuthService";
import IToken from "../../interfaces/Auth/IToken";
import decode from "../../util/JWT";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [loginDetails, setLoginDetails] = useState<IUserLoginDetails | null>(null);
    const [token, setToken] = useState<IToken | null>(null);
    const [initial, setInitial] = useState<boolean>(true);

    useEffect(() => {
        setToken(getTokenFromLS());
        if(token)
            setLoginDetails(decode<IUserLoginDetails>(token));
        setInitial(false);
    }, []);
    
    useEffect(() => {
        if(!initial){
            if(token)
                setLoginDetails(decode<IUserLoginDetails>(token));
            else{
                setLoginDetails(null);
                removeTokenFromLS();
            }     
        }
    }, [token]);
    //problem with refresh cause loginDetails in context to be null


    return (
        <AuthContext.Provider value={{ loginDetails, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
};