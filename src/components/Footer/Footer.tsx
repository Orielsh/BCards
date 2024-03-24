import { colsData as data } from "../../data/footerData";
import { ILinkCol } from "../../interfaces/common/ILink"
import FooterColumn from "../FooterColumn/FooterColumn";
import { BsInfoLg } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { LuWalletCards } from "react-icons/lu";


import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { CardListContext, CardListContextType } from "../../contexts/CardListContext/CardListContext";
import { Link } from "react-router-dom";
import "./Footer.css"

const colsData: ILinkCol[] = data;

export default function Footer() {

  const {loginDetails} = useContext<AuthContextType>(AuthContext);
  const { setListType } = useContext<CardListContextType>(CardListContext);

  return (
    <div className="Footer">
      <div className="upper">
        <div className="cols">
          {colsData.map((stack: ILinkCol, index) =>(
            <FooterColumn key={index} col={stack}/>
          ))}
        </div>
        <div className="nav">
          <Link to="/about">
            <span>About</span>
            <BsInfoLg />
          </Link>
          {loginDetails && <Link to="/favorites" onClick={()=>{setListType("favorited")}}>
            <span>Favorites</span>
            <FaHeart />
          </Link>}
          {loginDetails?.isBusiness && <Link to="/my-cards" onClick={()=>{setListType("userCards")}}>
            <span>My Cards</span>
            <LuWalletCards />
          </Link>}
        </div>
      </div>
      <div className="copy">
          <span>Oriel Shmuel</span>
          <span>כל הזכויות שמורות לאוריאל שמואל</span>
      </div>
    </div>
  )
}

