import { useContext, useEffect, useState } from "react";
import { ThemeContextType, ThemeContext } from "../../contexts/ThemeContext";

import { Link, NavLink, useLocation } from "react-router-dom";

import { CiDark, CiLight } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineMenu } from "react-icons/md";


import "./Header.css";
import { CardListContext, CardListContextType } from "../../contexts/CardListContext/CardListContext";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { IUserDetails } from "../../interfaces/user/IUser";
import { getUserById } from "../../services/AuthService";
import { PiPlus } from "react-icons/pi";

const searchableLocations = ["/", "/home", "/favorites", "/my-cards"];

export default function Header() {
  const { theme, setTheme } = useContext<ThemeContextType>(ThemeContext);   //delegate to separate file "themeToggler.."
  const {setFilterText, setListType} = useContext<CardListContextType>(CardListContext);
  const {token, loginDetails, setToken} = useContext<AuthContextType>(AuthContext);
  const [user, setUser] = useState<IUserDetails>();
  const [userImg, setUserImg] = useState<string>();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(()=>{
    (async () => {
      if(loginDetails && token)
      try {
        const tmpUser: IUserDetails = await getUserById(token, loginDetails._id);
        setUser(tmpUser);
        setUserImg(tmpUser.image.url);
      } catch (error) {
        console.log(error);
      }else setUser(undefined);
    })();
  },[loginDetails])

  useEffect(()=>{setMenuOpen(false)},[location])
  function toggleSideMenu(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <header>
      <div className="content">
        <Link to={"/"} className="brand">
          BCards
        </Link>

        <div className="menu-wrapper" style={{maxHeight: `${menuOpen ? "500px" : "0"}`}}>
          <div className="menu">
          <nav >
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {
              loginDetails && <li>
                <NavLink to="/favorites" onClick={()=>{setListType("favorited")}}>Favorites</NavLink>
              </li>
            }
            {
              loginDetails?.isBusiness && <li>
                <NavLink to="/my-cards" onClick={()=>{setListType("userCards")}}>My cards</NavLink>
              </li>
            }
          </ul>
        </nav>
          {!user && <div className="auth-wrapper">
            <NavLink className="Link login" to={"/login"}>Log in</NavLink>
            <Link className="Link sign-up" to={"/sign-up"}>Sign Up</Link>
          </div>}
          {user && <div className="user">
            <div className="details">
              <img src={userImg} alt={user.image.alt} onError={()=>{setUserImg("../assets/images/user-default.png")}}/>
              <Link to={"/sign-up"}>{user.name.first}</Link>
            </div>
            <div className="actions">
              {user.isBusiness && <Link to="create-card" title="Create card"><PiPlus className="icon"/></Link>}
              <button onClick={()=>{setToken(null)}}><LuLogOut className="logout" title="logout"/></button>
            </div>
          </div>}
          <button className="toggle-btn" onClick={() => { setTheme(theme === "light" ? "dark" : "light") }}>
            {theme === "light" ? <CiDark size={30} /> : <CiLight size={30} />}
          </button>
          </div>
        </div>
        
        <nav >
          <ul className="xl-none">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {
              loginDetails && <li>
                <NavLink to="/favorites" onClick={()=>{setListType("favorited")}}>Favorites</NavLink>
              </li>
            }
            {
              loginDetails?.isBusiness && <li>
                <NavLink to="/my-cards" onClick={()=>{setListType("userCards")}}>My cards</NavLink>
              </li>
            }
          </ul>
        </nav>

        {searchableLocations.includes(location.pathname) && <div className="search-wrapper"><div />
          <input type="text" placeholder="Filter.." onChange={(value)=>{setFilterText(value.target.value)}}/>
          <IoSearchOutline className={`magnify ${theme}`} size={30}/>
        </div>}

        

        {!user && <div className="auth-wrapper xl-none"> 
          <NavLink className="Link login" to={"/login"}>Log in</NavLink>
          <Link className="Link sign-up" to={"/sign-up"}>Sign Up</Link>
        </div>}
        {user && <div className="user xl-none">
          <div className="details">
            <img src={userImg} alt={user.image.alt} onError={()=>{setUserImg("../assets/images/user-default.png")}}/>
            <Link to={"/sign-up"}>{user.name.first}</Link>
          </div>
          <div className="actions">
            {user.isBusiness && <Link to="create-card" title="Create card"><PiPlus className="icon"/></Link>}
            <button onClick={()=>{setToken(null)}}><LuLogOut className="logout" title="logout"/></button>
          </div>
        </div>}
        <button className="toggle-btn xl-none" onClick={() => { setTheme(theme === "light" ? "dark" : "light") }}>
          {theme === "light" ? <CiDark size={30} /> : <CiLight size={30} />}
        </button>
        
      
        <MdOutlineMenu className="menu-btn" onClick={toggleSideMenu}/>

      </div>
    </header>
  )
}

