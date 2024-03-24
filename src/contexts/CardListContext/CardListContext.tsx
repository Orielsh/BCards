import {  createContext } from "react";
import { CardListType } from "../../types/common/CardList";

export interface CardListContextType {
    filterText: string,
    setFilterText(text: string): void,
    listType: CardListType
    setListType(type: CardListType): void,
}

export const CardListContext = createContext<CardListContextType>(
    {
        filterText:"",
        listType: "all",
        setFilterText: ()=>{},
        setListType: ()=>{},
    }
);
