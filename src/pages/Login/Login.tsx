import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { IUserCredentials } from "../../interfaces/user/IUser";
import { loginService, storeTokenLS } from "../../services/AuthService";
import IToken from "../../interfaces/Auth/IToken";
import { Link, useNavigate } from "react-router-dom";
import MessagePane from "../../components/MessagePane/MessagePane";
import LoggedIn from "../../components/LoggedIn/LoggedIn";
import "./Login.css"

export default function Login() {
  const auth = useContext<AuthContextType>(AuthContext);
  const [credentials, setCredentials] = useState<IUserCredentials>({ email: "", password: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [rememberLogin, setRememberLogin] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (submitted) {
      (async () => {
        try {
          const token: IToken = await loginService(credentials);
          auth.setToken(token);
          if (rememberLogin)
            storeTokenLS(token);
          setSuccess(true);
        } catch (error) {
          setError(error as Error);
        }
        finally {
          setSubmitted(false);
        }
      })();
    }
  }, [submitted]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [success]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
  }
  //todo: delegate components
  return (
    <div className="Login">
      {success ?
        <div className="Success">
          <MessagePane setError={setError} className="msg" title="Login success" message="redirecting to home page" />
          <Link to="/" className="link">Didn't get sent there? Click here!</Link>
        </div>
        : auth.token ? <LoggedIn /> :
          <div className="form-wrapper">
            <h1>Login</h1>
            {error && <MessagePane setError={setError} className="err" message={error.message} />}
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Username:</label>
                <input id="email" name="email" type="email" required onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label htmlFor="password">password:</label>
                <input id="password" name="password" type="text" required autoComplete="on" onChange={handleInputChange} />
                <div className="Link">
                  <Link to={"/reset-password"}>Reset your password</Link>
                </div>
              </div>
              <button type="submit">Login</button>
              <div className="remember">
                <input id="remember" type="checkbox" checked={rememberLogin} onChange={() => setRememberLogin(!rememberLogin)} />
                <label htmlFor="remember">Remember me?</label>
              </div>
            </form>
            <span>
              <span>Don't have an account?</span>
              <Link className="register" to={"/register"}> Sign up</Link>
            </span>
          </div>
      }
    </div>
  )
}

