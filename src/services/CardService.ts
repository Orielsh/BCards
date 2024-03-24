import IToken from "../interfaces/Auth/IToken";
import { ICard } from "../interfaces/card/ICard";

export async function getAllCards(): Promise<ICard[]> {
    try {
        const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", { method: "GET" });
        const data = await response.json();
        if (!response.ok) throw new Error(`Server Access error with code ${response.status}`);
        const cardsList: ICard[] = data;
        return cardsList;
    } catch (error) {
        throw (error);
    }
}

export async function getMyCards(token: IToken):Promise<ICard[]>{
    try {
        const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards", {
             method: "GET",
             headers: {
                'Content-Type': 'application/json',
                "x-auth-token":token.token,
             }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`Server Access error with code ${response.status}`);
        const cardsList: ICard[] = data;
        return cardsList;
    } catch (error) {
        throw (error);
    }
}

export async function getFavoritedCarsds(userId: string): Promise<ICard[]> {
    try {
        const allCards = await getAllCards();
        const cardsList: ICard[] = allCards.filter((card)=>(card.likes.includes(userId)));
        return cardsList;
    } catch (error) {
        throw (error);
    }
}

export async function getCardById(id: string): Promise<ICard> {
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, { method: "GET" });
        const data = await response.json();
        if (!response.ok) throw new Error(`Server Access error with code ${response.status}`);
        const card: ICard = data;
        return card;
    } catch (error) {
        throw (error);
    }
}

export async function likeACard(cardId: string, token: string): Promise<ICard> {
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`Server Access error with code ${response.status}`);
        const card: ICard = data;
        return card;
    } catch (error) {
        throw (error);
    }
}

export async function createCard(card: ICard, token: IToken):Promise<ICard>{
    try {
        const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token.token,
            },
            body: JSON.stringify(card),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: ICard = data;
        return result;
    } catch (error) {
        throw (error);
    }
}

export async function updateCard(card: ICard, token: IToken, cardId: string):Promise<ICard>{
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token.token,
            },
            body: JSON.stringify(card),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: ICard = data;
        return result;
    } catch (error) {
        throw (error);
    }
}

export async function deleteCard(bizNumber: number, token: IToken, cardId: string):Promise<ICard>{
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token.token,
            },
            body:JSON.stringify({"bizNumber":bizNumber})
        });

        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: ICard = data;
        return result;
    } catch (error) {
        throw (error);
    }
}