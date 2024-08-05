import React, { useEffect, useLocation, useState } from 'react'
import '../components/css/AllReviews.css'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../FireBase'
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'black' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AllReviews() {
    const [totalReviews, setTotalReviews] = useState([])
    const navigate = useNavigate();
    const [posterPath, setPosterPath] = useState('');

    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/129?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setPosterPath(resp.data.poster_path);
        })
    }, [])
    useEffect(() => {
        const getAllUsers = async () => {
            const collectionRefrence = collection(db, 'reviews')
            const userDocuments = await getDocs(collectionRefrence)
            userDocuments.forEach((user) => {
                setTotalReviews([...totalReviews, user.data()]);
            })
        }
        getAllUsers();
    }, [])
    console.log(totalReviews)
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Item className='items'>
                        <button className="Icon" onClick={() => { navigate('/home') }}><HomeIcon /></button>
                        <button className="Icon" onClick={() => { navigate('/allReview') }}><VideoLibraryIcon /></button>
                        <button className="Icon" onClick={() => { navigate('/userProfile') }}><PersonIcon /></button>
                    </Item>
                </Grid>
                <Grid item xs={11}>
                    <Item>
                        <div>
                            <h1 style={{ margin: '2rem' }}> All Reviews Given By CINEMA Users</h1>
                            {
                                totalReviews.map((review, index) => {
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
    )
}

export default AllReviews
