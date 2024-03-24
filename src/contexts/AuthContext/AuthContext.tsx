import {  createContext } from "react";
import { IUserLoginDetails } from "../../interfaces/user/IUser";
import IToken from "../../interfaces/Auth/IToken";

export interface AuthContextType {
    loginDetails: IUserLoginDetails | null,
    token: IToken | null,
    setToken(token: IToken | null): void,
}

export const AuthContext = createContext<AuthContextType>({
    loginDetails: null,
    token: null,
    setToken: () => {},
});
