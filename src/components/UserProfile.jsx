import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../FireBase'
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'black' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function UserProfile() {
    const navigate = useNavigate()
    const [myReviews, setMyReviews] = useState([])
    const [posterPath, setPosterPath] = useState('');
    useEffect(() => {
        const getAllUsers = async () => {
            const collectionRefrence = collection(db, 'reviews')
            const userDocuments = await getDocs(collectionRefrence)
            userDocuments.forEach((user) => {
                setMyReviews([...myReviews, user.data()]);
            })
        }
        getAllUsers();
    }, [])
    console.log(myReviews)
    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/129?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setPosterPath(resp.data.poster_path);
        })
    }, [])
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Item className='items'>
                            <button className="Icon" onClick={() => { navigate('/home') }}><HomeIcon /></button>
                            <button className="Icon" onClick={() => { navigate('/allReviews') }}><VideoLibraryIcon /></button>
                            <button className="Icon" onClick={() => { navigate('/userProfile') }}><PersonIcon /></button>
                        </Item>
                    </Grid>
                    <Grid item xs={11}>
                        <Item>
                            <h1 style={{margin:'2rem',fontSize:'3rem'}}>My Reviews</h1>
                            <div>
                            {
                                myReviews.map((review, index) => {
                                    return (

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8}>
                                                    <Item>
                                                        <div className="reviewDetailsss">
                                                            <div key={index} style={{backgroundColor:'white'}}>
                                                                <h2 style={{ backgroundColor: 'white', color: 'black', textAlign: 'left' }}>{review.review}</h2>
                                                                <h2 style={{ marginRight: '32rem', marginTop: '1rem', color: 'rgb(10, 75, 255)', backgroundColor: 'white' }}>{review.name}</h2>
                                                                <h2 style={{ width: '14rem', backgroundColor: 'white', color: 'black', marginTop: '0.5rem', marginRight: '3rem' }}>Rating:<span style={{ color: ' rgba(81, 0, 255, 0.9)', backgroundColor: 'white', textDecoration: 'none' }}> {review.rating}</span> out of 5.</h2>
                                                            </div>
                                                            <div style={{height:'8rem'}}>
                                                                <img style={{ height: '8rem',cursor:'pointer' }} onClick={()=>{navigate('/home')}} src={`https://image.tmdb.org/t/p/w500${posterPath}`} />
                                                            </div>
                                                        </div>
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )
                                })
                            }
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default UserProfile
