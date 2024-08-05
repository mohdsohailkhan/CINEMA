import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../components/css/Home.css'
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'black' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home() {
    const navigate = useNavigate()
    const [topMovies, setTopMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [nowPlaying , setNowPlaying] = useState([])
    const [comeing , setComeing] = useState([])

    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/top_rated?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setTopMovies(resp.data.results);
        })
    }, [])
    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/popular?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setPopularMovies(resp.data.results);
        })
    }, [])
    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/now_playing?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setNowPlaying(resp.data.results);
        })
    }, [])
    useEffect(() => {
        const API = `https://api.themoviedb.org/3/movie/upcoming?api_key=588e73aa89caa1adca906ef27976e6cf`
        axios.get(API).then(resp => {
            setComeing(resp.data.results);
        })
    }, [])
    function handleMovieDetails(movie){
        navigate('/movieDetails/'+movie.id,{state:movie})
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 2
    };

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Item className="items">
                            <button className="Icon" onClick={()=>{navigate('/home')}}><HomeIcon /></button>
                            <button className="Icon" onClick={() => { navigate('/allReviews') }}><VideoLibraryIcon /></button>
                            <button className="Icon" onClick={()=>{navigate('/userProfile')}}><PersonIcon /></button>
                        </Item>
                    </Grid>
                    <Grid item xs={11}>
                        <Item className="mainCarosuelItem">
                        <div className="carosuelMainDiv1">
                                <h1 className="movieHeading">Now Playing</h1>
                                <Slider {...settings}>
                                    {
                                        nowPlaying.map((movie) => {
                                            return (
                                                    <div className="carosuelDiv" key={movie.id} onClick={()=>handleMovieDetails(movie)}>
                                                        <img className="carosuelImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                                        <h3 className="movieTitle">{movie.title}</h3>
                                                    </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className="carosuelMainDiv2">
                                <h1 className="movieHeading">Top Rated Movies</h1>
                                <Slider {...settings}>
                                    {
                                        topMovies.map((movie) => {
                                            return (
                                                    <div className="carosuelDiv" key={movie.id} onClick={()=>handleMovieDetails(movie)}>
                                                        <img className="carosuelImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                                        <h3 className="movieTitle">{movie.title}</h3>
                                                    </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className="carosuelMainDiv3">
                                <h1 className="movieHeading">Popular Movies</h1>
                                <Slider {...settings}>
                                    {
                                        popularMovies.map((movie) => {
                                            return (
                                                    <div className="carosuelDiv" key={movie.id} onClick={()=>handleMovieDetails(movie)}>
                                                        <img className="carosuelImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                                        <h3 className="movieTitle">{movie.title}</h3>
                                                    </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className="carosuelMainDiv4">
                                <h1 className="movieHeading">Up Coming Movies</h1>
                                <Slider {...settings}>
                                    {
                                        comeing.map((movie) => {
                                            return (
                                                    <div className="carosuelDiv" key={movie.id} onClick={()=>handleMovieDetails(movie)}>
                                                        <img className="carosuelImg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                                        <h3 className="movieTitle">{movie.title}</h3>
                                                    </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}