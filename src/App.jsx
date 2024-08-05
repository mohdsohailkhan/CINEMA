import Login from "./components/Login"
import Register from "./components/Register"
import './components/css/Home.css'
import Home from "./components/Home"
import '../src/App.css'
import MovieDetails from "./components/MovieDetails"
import { Route, Routes, useNavigate } from "react-router-dom"
import PostReview from "./components/PostReview"
import AllReviews from "./components/AllReviews"
import UserProfile from "./components/UserProfile"
import logo from '../src/assets/cinemacompany.avif'
import { auth } from '../src/FireBase'
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { signOut } from "firebase/auth"

function App() {
  const [userLoggedIn , setUserLoggedIn] = useState(false);  
  const navigate = useNavigate()
  function handleLogout() {
    signOut(auth).then(resp => {
      navigate('/')
      setUserLoggedIn(false)
    })
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        navigate('/home');
        setUserLoggedIn(true);
      }
      else {
        navigate('/');
      }
    })
  }, [])
  function handleLogo(){
    navigate('/home')
  }
  return (
    <>
      { userLoggedIn && <div className="Navbar">
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
          <img onClick={handleLogo} style={{ height: '4rem',cursor:'pointer', marginLeft: '2rem', marginBottom: '0.6rem', backgroundColor: 'white', borderRadius: '50%' }} src={logo} />
          <h1 style={{ backgroundColor: 'white', marginLeft: '2rem', color: 'black', fontSize: '2.3rem' }}>CINEMAS</h1>
        </div>
        <div className="logoutDiv">
          <button onClick={handleLogout} className="logout">Logout</button>
        </div>
      </div>}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movieDetails/:id" element={<MovieDetails />} />
          {/* <Route path="/postReview" element={<PostReview/>}/> */}
          <Route path="/allReviews" element={<AllReviews />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
