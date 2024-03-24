import Header from "../../components/Header/Header"
import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home/Home"
import NotFound from "../../pages/NotFound/NotFound"
import Footer from "../../components/Footer/Footer"
import "./Default.css"
import Login from "../../pages/Login/Login"
import CardPage from "../../pages/CardPage/CardPage"
import Register from "../../pages/Register/Register"
import About from "../../pages/About/About"
import CreateCard from "../../components/CreateCard/CreateCard"

export default function Default() {
  return (
    <div className="Default">
      <Header/>
     
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/favorites" element={<Home/>}></Route>
            <Route path="/my-cards" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/sign-up" element={<Register/>}></Route>
            <Route path='/card-details/:cardId' element={<CardPage/>}/>
            <Route path='/edit-card/:cardId' element={<CreateCard/>}/>
            <Route path='/create-card' element={<CreateCard/>}/>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      
      <Footer/>
    </div>
  )
}

