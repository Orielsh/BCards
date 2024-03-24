import { Link, useNavigate, useParams } from "react-router-dom"
import "./CardPage.css"
import { useContext, useEffect, useState } from "react";
import { ICard } from "../../interfaces/card/ICard";
import { deleteCard, getCardById, likeACard } from "../../services/CardService";
import { IoMdOpen } from "react-icons/io";
import { CiEdit, CiHeart } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { FaHeart } from "react-icons/fa6";
import MessagePane from "../../components/MessagePane/MessagePane";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";

export default function CardPage() {
  const {token, loginDetails} = useContext<AuthContextType>(AuthContext);
  const { cardId } = useParams<string>();
  const [card, setCard] = useState<ICard | null>(null);
  const [error, setError] = useState<Error | undefined>();
  const [img, setImg] = useState<string | undefined>();
  const [likes, setLikes] = useState<string[]>();
  const [like, setLike] = useState<boolean>(false);
  const toasts = useContext<ToastsContextType | undefined>(ToastContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (cardId)
      (async () => {
        try {
          const tmpCard: ICard = await getCardById(cardId);
          setCard(tmpCard);
          setImg(tmpCard?.image.url);
          if(loginDetails?._id)
            setLike(tmpCard.likes.includes(loginDetails?._id!));
          setLikes(tmpCard.likes);
        } catch (error) {
          setError(error as Error);
        }
      })();
  }, [cardId, loginDetails?._id]);

  useEffect(() => {
    if(like !== likes?.includes(loginDetails?._id!) && likes)
    (async () => {
      try {
        if (cardId && token?.token)
          await likeACard(cardId, token.token);
      } catch (error) {
        setError(error as Error);
      }
      if(like)
        setLikes([...likes, loginDetails?._id!])
      else
        setLikes(likes.filter(id=>(id!==loginDetails?._id)));
    })();
  }, [like]);



  return (

    <div className="CardPage">
      {
        error ?
          <MessagePane setError={setError} message={error.message} title="Error" className={""} />
          :
          <>
            <img src={img} alt={card?.image.alt} onError={() => {
              setImg("../assets/images/not-found.jpg");
            }}
            />
            <div className="description">
              {token && <div className="like" onClick={() => {
                setLike(!like);
              }}>{like ? <FaHeart color="red"/>:<CiHeart />}</div>}
              <h2>{card?.title}</h2>
              <h3>{card?.subtitle}</h3>
              <span>{`${likes?.length} Likes`}</span>
              <hr />
              <p>{card?.description}</p>
              <div className="contact">
                <span>EMail: {card?.email}</span>
                <span>Phone number: {card?.phone}</span>
                <span>Address: &nbsp;
                  {card?.address.country}&nbsp;
                  {card?.address.city}&nbsp;
                  {card?.address.street}&nbsp;
                  {card?.address.houseNumber}&nbsp;
                  {card?.address.zip}&nbsp;
                  {card?.address.state}&nbsp;
                </span>
                <div className="bottom">
                  <a href={`${card?.web!.substring(0, 4) === 'http' ? card.web : `http://${card?.web}`}`} className="goto" rel="noopener noreferrer"><IoMdOpen /></a>
                  {(card?.user_id === loginDetails?._id || loginDetails?.isAdmin )&& <Link to={`/edit-card/${cardId}`}><CiEdit /></Link>}
                  {(card?.user_id === loginDetails?._id || loginDetails?.isAdmin) && <button onClick={()=>{
                    if(card?.bizNumber && token && cardId){
                      (async ()=>{
                        try{
                          const response:ICard = await deleteCard(card.bizNumber, token, cardId);
                          if(response._id === card._id){
                            toasts?.addToast({headerText:"Card deleted", message: "successful", success: true});
                            navigate("/my-cards");
                          }
                        }catch(error){
                          throw (error as Error);
                        }
                      })();
                    }
                  }}><MdDeleteSweep/></button>}
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}