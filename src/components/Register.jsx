import React, { useState } from "react";
import logo from '../assets/cinemacompany.avif'
import './css/Register.css'
import { useNavigate } from "react-router-dom";
import {auth} from '../FireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    async function handleSignup(){
        createUserWithEmailAndPassword(auth , email , password).then((userCredential)=>{
            console.log(userCredential);
            navigate('/home');
        }).catch((err)=>{
            console.log(err);
            alert('Looks like you are already a member please Login')
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
                <input className="email"  onChange={(e)=>setPassword(e.currentTarget.value)} placeholder="Enter Password" type="password"/>
                <input className="fullName" placeholder="Enter Full Name"/>
                <br/>
                <button className="RegisterButton" onClick={handleSignup}>Join the Club</button>
                <p>Already a member ?<span onClick={()=>{navigate('/')}}>Click here</span></p>
            </div>
        </div>
    )
}