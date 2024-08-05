import React, { useState } from "react";
import './css/MovieDetails.css'
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect } from "react";
import axios, { all } from "axios";
import { setDoc, doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FireBase";
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PersonIcon from '@mui/icons-material/Person';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'black' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function MovieDetails() {
    const [docs, setDocs] = useState([]);
    const [personName, setPersonName] = useState('');
    const [textarea, setTextarea] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [cast, setCast] = useState([]);
    const [rating, setRating] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { title, poster_path, overview, id } = location.state;

    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setCast(resp.data.cast);
        })
    }, [])
    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setSimilarMovies(resp.data.results)
        })
    }, [])
    function handleReviewButon() {
        setIsVisible(false)
        const firebasefunction = async () => {
            const collectionRefrence = collection(db, 'reviews')
            addDoc(collectionRefrence, {
                id: id,
                name: personName,
                review: textarea,
                rating: rating
            }).then(resp => {
                console.log(resp);
            })
        }
        firebasefunction();
    }

    useEffect(() => {
        const getFilmReview = async () => {
            const collectionRefrence = collection(db, 'reviews')
            const q = query(collectionRefrence, where('id', '==', id))

            getDocs(q).then(res => {
                res.forEach(doc => {
                    setDocs([...docs, doc.data()]);
                })
            })
        }
        getFilmReview();
    }, [])
    console.log(docs);

    return (
        <div>
            <div className="mainMovieDetails">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <Item className="items">
                            <button className="Icon" onClick={()=>{navigate('/home')}}><HomeIcon /></button>
                            <button className="Icon" onClick={() => { navigate('/allReviews') }}><VideoLibraryIcon /></button>
                            <button className="Icon" onClick={()=>{navigate('/userProfile')}}><PersonIcon/></button>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <img className="largeImg" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
                                <h1 className="headingt">{title}</h1>
                                <h2 className="overviewHeading">Movie Overview:</h2>
                                {isVisible && <div className="mainDivPostReview">
                                    <h2 className="reviewHeading">Enter Your Review Here</h2>
                                    <input type="text" placeholder="Enter your Name" className="postName" value={personName} onChange={(e) => setPersonName(e.currentTarget.value)} />
                                    <textarea placeholder="Enter Your Review" className="textarea" value={textarea} onChange={(e) => setTextarea(e.currentTarget.value)} name="textarea" id="" cols="50" rows="5"></textarea>
                                    <h3 className="rating">Rating  <input value={rating} onChange={(e) => setRating(e.currentTarget.value)} className="ratingInput" placeholder="3" />  Out  of  5</h3>
                                    <button onClick={handleReviewButon} className="postReviewButton" type="submit">Submit</button>
                                </div>}
                                <div className="overviewP">
                                    <h4>{overview}</h4>
                                </div>
                                <button onClick={() => setIsVisible(true)} className="PostReview">Post Review</button>
                                <h1 className="castHeading">Cast & Crew</h1>
                                <div className="mainCastDiv">
                                    {
                                        cast.slice(0,12).map((casting, index) => {
                                            return (
                                                <div key={index} className="castDiv">
                                                    <img className="castImg" src={`https://image.tmdb.org/t/p/w500${casting.profile_path}`} />
                                                    <h3>{casting.name}</h3>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h1 className="similarHeading">Similar Movies</h1>
                                <div className="mainSimilarMovieDiv">
                                    {
                                        similarMovies.map((similar, index) => {
                                            return (
                                                <div key={index} className="similarDiv">
                                                    <img className="similarImg" src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`} />
                                                    <h5>{similar.title}</h5>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={5}>
                            <Item>
                                <h1 style={{ marginTop: '1rem' }}>Reviews By CINEMA Users</h1>
                                {
                                    docs.map((rev, index) => {
                                        return (
                                            < div key={index} className="reviewDetails" >
                                                <h2 style={{ backgroundColor: 'white', color: 'black', textAlign: 'left' }}>{rev.review}</h2>
                                                <h2 style={{ marginRight: '32rem', marginTop: '1rem', color: 'rgb(10, 75, 255)', backgroundColor: 'white' }}>{rev.name}</h2>
                                                <h2 style={{ width: '12rem', backgroundColor: 'white', color: 'black', marginTop: '0.5rem', marginRight: '3rem' }}>Rating:<span style={{ color: ' rgba(81, 0, 255, 0.9)', backgroundColor: 'white', textDecoration: 'none' }}> {rev.rating}</span> out of 5.</h2>
                                            </div>
                                        )
                                    })
                                }
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div >
    )
}