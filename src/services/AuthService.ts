import IToken from "../interfaces/Auth/IToken";
import { IUserCredentials, IUserDetails } from "../interfaces/user/IUser";

export async function loginService(credentials: IUserCredentials): Promise<IToken> {
    try {
        const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.text();
        if (!response.ok) throw new Error(data);
        const token: IToken = { token: data };
        return token;
    } catch (error) {
        throw error;
    }
}

export async function register(user: IUserDetails): Promise<IUserDetails> {
    try {
        const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok)
            throw new Error(await response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getUserById(token: IToken, userId: string): Promise<IUserDetails> {
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token.token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const userDetails: IUserDetails = data;
        return userDetails;
    } catch (error) {
        throw error;
    }
}

export async function getAllUsers(token: IToken): Promise<IUserDetails[]> {
    try {
        const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token.token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const userDetails: IUserDetails[] = data;
        return userDetails;
    } catch (error) {
        throw error;
    }
}

export function storeTokenLS(token: IToken): void {
    localStorage.setItem("token", JSON.stringify(token));
}

export function getTokenFromLS(): IToken | null {
    const token: string | null = localStorage.getItem("token");
    if (token)
        return JSON.parse(token);
    return null;
}

export function removeTokenFromLS(): void {
    localStorage.removeItem("token");
}