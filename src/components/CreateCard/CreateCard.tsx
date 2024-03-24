import { useContext, useEffect, useState } from "react"
import "./CreateCard.css"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ICard } from "../../interfaces/card/ICard";
import { createCard, getCardById, updateCard } from "../../services/CardService";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";

export default function CreateCard() {

  const { register, handleSubmit, getValues, setValue, reset, formState: { errors } } = useForm<ICard>();
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { loginDetails, token } = useContext<AuthContextType>(AuthContext);
  const [card, setCard] = useState<ICard>();
  const url = useLocation();
  const navigate = useNavigate();
  const { cardId } = useParams<string>();
  const toasts = useContext<ToastsContextType | undefined>(ToastContext);
  
  useEffect(() => {
    if (submit)
      (async () => {
        try {
          const response: ICard = cardId ?await updateCard(getValues(), token!, cardId) : await createCard(getValues(), token!);
          if (response){
            toasts?.addToast({headerText: "Successful", message: cardId? "Card updated" : "Card created", success: true})
            navigate("/my-cards");
          }
        } catch (error) {
          setError(error as Error);
        }
        finally {
          setSubmit(false);
        }
      })();
  }, [submit]);

  useEffect(()=>{
      if (cardId)
      (async () => {
        try {
          setCard(await getCardById(cardId));
        } catch (error) {
          setError(error as Error);
        }
      })();
  },[cardId])

  useEffect(()=>{setCard(undefined)},[url])

  useEffect(()=>{
    if(card){
      setValue("title", card.title);
      setValue("subtitle", card.subtitle);
      setValue("address.city", card.address.city);
      setValue("address.country", card.address.country);
      setValue("address.houseNumber", card.address.houseNumber);
      setValue("address.state", card.address.state);
      setValue("address.street", card.address.street);
      setValue("address.zip", card.address.zip);
      setValue("description", card.description);
      setValue("image.url", card.image.url);
      setValue("image.alt", card.image.alt);
      setValue("phone", card.phone);
      setValue("email", card.email);
      setValue("web", card.web);
    }else{
      reset();
    }
  },[card])
  return (
    <div className="CreateCard">
      {error && <p>{error.message}</p>}
      {
        loginDetails ?
          //Logged in as business account
          (loginDetails.isBusiness ? <div>
            <h2>Create card</h2>
            <form onSubmit={handleSubmit(() => setSubmit(true))} noValidate>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="title">Title</label>
                  <input id="title" type="text" className={errors.title && "error"} {...register("title", { required: "Required", minLength: 2, maxLength: 256 })} />
                </div>
                <div className="input-group">
                  <label htmlFor="subTitle">Sub title</label>
                  <input id="subTitle" type="text" className={errors.subtitle && "error"} {...register("subtitle", { minLength: 2, maxLength: 256 })} />
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" className={errors.phone && "error"}  {...register("phone", { required: true, minLength: 9, maxLength: 11 })} />
                </div>
                <div className="input-group">
                  <label htmlFor="email">EMail</label>
                  <input id="email" type="email" className={errors.email && "error"} {...register("email", { required: true, minLength: 5 })} />
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="url">Website</label>
                  <input id="url" type="url"className={errors.web && "error"} {...register("web", { minLength: 14 })} />
                </div>
              </div>
              <div className="row">
                    <div className="input-group">
                      <label htmlFor="country">Country</label>
                      <input id="country" type="text" className={errors.address?.country && "error"} {...register("address.country", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="city">City</label>
                      <input id="city" type="text" className={errors.address?.city && "error"} {...register("address.city", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="street">Street</label>
                      <input id="street" type="text" className={errors.address?.street && "error"} {...register("address.street", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <label htmlFor="houseNumber">House Number</label>
                      <input id="houseNumber" type="number" className={errors.address?.houseNumber && "error"} {...register("address.houseNumber", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="zip">Zip</label>
                      <input id="zip" type="number" className={errors.address?.zip && "error"} {...register("address.zip", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="state">State (Optional)</label>
                      <input id="state" type="text" className={errors.address?.state && "error"} {...register("address.state", { required: false, minLength: 2, maxLength: 256 })} />
                    </div>
                  </div>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="imgURL">Photo URL</label>
                  <input id="imgURL" type="url" className={errors.image?.url && "error"} {...register("image.url", { minLength: 14 })} />
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="description">Business description</label>
                  <textarea id="description" className={errors.description && "error"} rows={3} {...register("description", { required: true, minLength: 2, maxLength: 1024 })} />
                </div>
              </div>
              <div className="buttons">
                    <input className="form-btn" type="reset" value={"Reset form"} />
                    {/* todo 👆 add confirmation dialogue inside modal (ask to confirm reset)*/}
                    <input className="form-btn" type="submit" value={"Submit"} />
                  </div>
            </form>
          </div>
            :
            //User logged in but not as a business accoung
            <div className="not-business">
              <h2>Not a business acoount</h2>
              <p>You need to be business account to create card</p>
              <Link to={`edit-user/${loginDetails._id}`}>Click here to edit your profile</Link>
            </div>)

          :
          // User not logged in
          <div><h2>Only business accounts can create business cards.</h2></div>
      }
    </div>
  )
}

