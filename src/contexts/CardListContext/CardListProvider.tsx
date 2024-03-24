import { ReactNode, useContext, useEffect, useState } from "react";
import { CardListType } from "../../types/common/CardList";
import { CardListContext } from "./CardListContext";
import { AuthContext, AuthContextType } from "../AuthContext/AuthContext";

export default function CardListProvider({ children }: { children: ReactNode }) {

    const [filterText, setFilterText] = useState<string>("");
    const [listType, setListType] = useState<CardListType>("all");
    const {loginDetails} = useContext<AuthContextType>(AuthContext);

    useEffect(()=>{
        setListType("all");
        setFilterText("");
    },[loginDetails]);
    
    return (
        <CardListContext.Provider value={
            {
                filterText: filterText,
                setFilterText: setFilterText,
                listType: listType,
                setListType: setListType,
            }
        }>
            {children}
        </CardListContext.Provider>
    )
};