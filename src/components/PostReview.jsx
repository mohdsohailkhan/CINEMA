import React, { useEffect, useState } from "react";
import '../components/css/PostReview.css'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../FireBase";

export default function PostReview({onclose}){
    const [textarea , setTextarea] = useState('');
    // function handleReview(){
    // onclose(false);
    // }
    useEffect(()=>{
        const firebasefunction = async()=>{
            const collectionRefrence = doc(db,'reviews' , 'sohail')
            setDoc(collectionRefrence,{
               review : textarea
            }).then(res=>{
                console.log(res)
            })
        }
        firebasefunction();
    })
    return(
        <div className="mainDivPostReview">
            <h2 className="reviewHeading">Enter Your Review Here</h2>
            <textarea className="textarea" value={textarea} onChange={(e)=>setTextarea(e.currentTarget.value)} name="textarea" id="" cols="50" rows="5"></textarea>
            <h3 className="rating">Rating  <input className="ratingInput" placeholder="3"/>  Out  of  5</h3>
            <button onClick={()=>handleReview(onclose)} className="postReviewButton" type="submit">Submit</button>
        </div>
    )
}