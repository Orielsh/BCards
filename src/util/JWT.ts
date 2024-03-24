import { jwtDecode } from "jwt-decode";
import IToken from "../interfaces/Auth/IToken";

export default function decode<Type>(token: IToken): Type{
    return jwtDecode(token.token);
}