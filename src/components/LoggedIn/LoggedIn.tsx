import { Link } from "react-router-dom"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { useContext } from "react";
import { GoSignOut } from "react-icons/go";
import "./LoggedIn.css"

export default function LoggedIn() {

  const {setToken} = useContext<AuthContextType>(AuthContext);

  return (
    <div className="LoggedIn">
      <h3>Already logged in</h3>
      <Link to="/">Back to Home</Link>
      <h3>OR</h3>
      <button onClick={()=>{setToken(null)}}>
        <span>Log out</span>
        <GoSignOut />
      </button>
    </div>
  )
}

