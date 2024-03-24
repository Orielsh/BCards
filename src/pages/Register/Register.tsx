import { useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import LoggedIn from "../../components/LoggedIn/LoggedIn";
import { useForm } from "react-hook-form";
import { IUserDetails } from "../../interfaces/user/IUser";
import { register as signUp } from "../../services/AuthService";
import "./Register.css"
import MessagePane from "../../components/MessagePane/MessagePane";

interface IFormInput extends IUserDetails {
  passwordConfirm?: string,
}

export default function Register() {

  const { token } = useContext<AuthContextType>(AuthContext);
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState<boolean>();
  const { register, handleSubmit, getValues, formState: { errors }, watch } = useForm<IFormInput>();
  const [img, setImg] = useState<string>("./assets/images/user-default.png");
  const [hidePassword] = useState<boolean>(true);  //todo add eye icon on password fields
  const [hidePassConfirm] = useState<boolean>(true);

  useEffect(() => {
    if (submit)
      (async () => {
        try {
          const userData: IFormInput = getValues();
          userData.image.alt = "User profile picture";
          delete userData.passwordConfirm;
          const response: IUserDetails = await signUp(userData);
          if (response)
            setSuccess(true);
        } catch (error) {
          setError(error as Error);
        }
        finally {
          setSubmit(false);
        }
      })();
  }, [submit]);

  return (
    <div className="Register">
      {error ? <MessagePane message={error.message} title="Error" className="" setError={setError} /> :
        token ? <LoggedIn /> :
          success ? <MessagePane setError={setError} message="Register Success" className="" /> :
            <div>
              <div className="left">
                <h2>Register</h2>
                <form onSubmit={handleSubmit(() => setSubmit(true))} noValidate>
                  <div className="row">
                    <div className="input-group">
                      <label htmlFor="fName">First name</label>
                      <input id="fName" type="text" className={errors.name?.first && "error"} {...register("name.first", { required: "Required", minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="mName">Middle name (Optional)</label>
                      <input id="mName" type="text" className={errors.name?.middle && "error"} {...register("name.middle", { minLength: 2, maxLength: 256 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="lName">Last name</label>
                      <input id="lName" type="text" className={errors.name?.last && "error"} {...register("name.last", { required: true, minLength: 2, maxLength: 256 })} />
                    </div>
                  </div>
                  {/* Contact */}
                  <div className="row">
                    <div className="input-group">
                      <label htmlFor="email">EMail</label>
                      <input id="email" type="email" className={errors.email && "error"} {...register("email", { required: true, minLength: 5 })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="phone">Phone number</label>
                      <input id="phone" type="tel" className={errors.phone && "error"} {...register("phone", { required: true, minLength: 9, maxLength: 11 })} />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="row">
                    <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input id="password" type={hidePassword ? "password" : "text"} className={errors.password && "error"} autoComplete="on"
                        {...register("password", {
                          required: true,
                          minLength: 7,
                          maxLength: 20,
                          // pattern:  todo: find pattern
                        })} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="passwordConfirm">Password confirm</label>
                      <input id="passwordConfirm" type={hidePassConfirm ? "password" : "text"} className={errors.passwordConfirm && "error"} autoComplete="on"
                        {...register("passwordConfirm", {
                          required: true,
                          validate: (val?: string) => {
                            return val === watch("password");
                          }
                        })} />
                    </div>
                  </div>
                  {/* Address */}
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
                      <label htmlFor="imgUrl">Profile photo image URL</label>
                      <input id="imgUrl" type="text" className={errors.image?.url && "error"}
                        {...register(
                          "image.url",
                          {
                            required: true,
                            minLength: 2,
                            maxLength: 256,
                            onBlur: (() => {
                              setImg(watch("image.url"));
                            })
                          })} />
                    </div>
                    <div className="input-group cb">
                      <label htmlFor="isBusiness">Are you a business?</label>
                      <input id="isBusiness" type="checkbox" className={errors.isBusiness && "error"} {...register("isBusiness", { required: false })} />
                    </div>
                  </div>
                  <div className="buttons">
                    <input className="form-btn" type="reset" value={"Reset form"} />
                    {/* todo 👆 add confirmation dialogue inside modal (ask to confirm reset)*/}
                    <input className="form-btn" type="submit" value={"Submit"} />
                  </div>
                </form>
              </div>
              <div className="right">
                <img src={img} alt="User photo" onError={() => setImg("./assets/images/user-default.png")} />
              </div>
            </div>
      }
    </div>
  )
}

