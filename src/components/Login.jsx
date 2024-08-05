import React from "react";
import logo from '../assets/cinemacompany.avif'
import '../components/css/Login.css'
import {  useNavigate } from "react-router-dom";
import {auth} from '../FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate()
    async function handleLogin(){
        signInWithEmailAndPassword(auth , email , password).then((userCredentials)=>{
            console.log(userCredentials.user);
            navigate('/home');
        }).catch((err)=>{
            console.log(err);
            alert('Please sign in or Join the Club or Enter the Correct Email and Password');
        })
    }
    return (
        <div className="maindiv">
            <div>
                <img className="logo" src={logo}/>
            </div>
            <div className="cinema">
                <h1 className="heading"><i>CINEMAS</i></h1>
                <input className="email" onChange={(e)=>setEmail(e.currentTarget.value)} placeholder="Enter Email"/>
                <input className="email" onChange={(e)=>setPassword(e.currentTarget.value)} placeholder="Enter Password" type="password"/>
                <br/>
                <button className="loginButton" onClick={handleLogin}>Login Now</button>
                <p>Join the club,<span onClick={()=>{navigate('/signup')}}>Click here</span></p>
            </div>
        </div>
    )
}