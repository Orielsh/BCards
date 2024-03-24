import { ICard } from "../../interfaces/card/ICard";
import { MdAlternateEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";

import "./Card.css"
import { useState } from "react";
import { Link } from "react-router-dom";

interface ICardProps {
  card: ICard;
}

export default function Card(props: ICardProps) {
  const { card } = props;
  const [img, setImg] = useState<string>(card.image.url);

  return (
    <div className="Card">
      <img src={img} alt={card.image.alt} onError={() => {
        setImg("./assets/images/not-found.jpg");
      }} />
      <div className="content">
        <div className="desc">
          <h3>{card.title}</h3>
          <h4>{card.subtitle}</h4>
          <p>{card.description}</p>
        </div>

        <div className="bottom">
          <div className="contact-wrapper">
            <a href={`mailto:${card.email}`} rel="noopener noreferrer"><MdAlternateEmail /></a>
            <a href={`tel:${card.phone}`} rel="noopener noreferrer"><FaPhone /></a>
            <Link to={`../card-details/${card._id}`}><FaArrowRightLong/></Link>
          </div>
          <div className="details">
            <span title={`${card.address.country}, ${card.address.city}`}>{card.address.country}, {card.address.city}</span>
            <div className="likes">
              <span>{card.likes.length}</span>
              <IoHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

