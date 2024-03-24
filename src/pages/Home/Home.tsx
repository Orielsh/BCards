import { useContext, useEffect, useState } from "react";
import { getAllCards, getFavoritedCarsds, getMyCards } from "../../services/CardService";
import Card from "../../components/Card/Card";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { CardListContext, CardListContextType } from "../../contexts/CardListContext/CardListContext";
import { ICard } from "../../interfaces/card/ICard";

import "./Home.css";
import { useLocation } from "react-router-dom";


export default function Home() {
  //todo: refactor so card list will receive list of cards via parameter so not need here context ref etc..
  //refactor: consider save one list to all system
  //todo: consider useParameters for listType
  const [error, setError] = useState<Error | null>(null);
  const { token, loginDetails } = useContext<AuthContextType>(AuthContext);
  const [cardList, setCardList] = useState<ICard[]>();
  const { filterText, listType, setListType } = useContext<CardListContextType>(CardListContext);
  const url = useLocation();

  useEffect(() => {
    (async () => {
      try {
        switch (listType) {
          case "userCards":
            setCardList(await getMyCards(token!));
            break;
          case "favorited":
            setCardList(await getFavoritedCarsds(loginDetails!._id));
            break;
          case "all":
            setCardList(await getAllCards());
            break;
          default:
            setCardList(await getAllCards());
        }
      } catch (error) {
        setError(error as Error);
      }
    })();
  }, [listType]);

  useEffect(()=>{
    switch (url.pathname) {
      case "/my-cards":
        setListType("userCards");
        break;
      case "/favorites":
        setListType("favorited");
        break;
      case "/":
        setListType("all");
        break;
      default:
        setListType("all");
    }
  },[url])

  return (
    <div className="Home">
      {((listType === "favorited") || (listType==="userCards")) && <div className="favorited">
        <h2>{cardList?.length} {listType === "favorited" ? "Favorite cards" : "Cards"}</h2>
      </div>
      }
      <div className="cards">
        {cardList ?
          cardList.filter((card)=>(card.title + card.description).includes(filterText) || filterText.length === 0)
          .map((card)=><Card key={card._id} card={card} />)
          :
          (!error) && <h1>Loading</h1>
        }
      </div>
    </div>
  )
}

