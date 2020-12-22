import React, { useEffect, useState } from 'react';
import { 
    fetchGenre, 
    fetchMovies,
    fetchMovieByGenre,
    fetchPersons,
    fetchTopRatedMovie
} from '../../service';
import '../../index.css';
//import RBCarousel from 'react-bootstrap-carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
//import Carousel.Item from 'react-bootstrap/Carousel.';

function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);

    //console.log(nowPlaying);

    useEffect(() => {
        const fetchAPI = async () => {
        //const res = await fetchMovies();    
        setNowPlaying(await fetchMovies());
        setGenres(await fetchGenre());  
        setMovieByGenre(await fetchMovieByGenre(28));
        setPersons(await fetchPersons());
        setTopRated(await fetchTopRatedMovie());
        };
        fetchAPI();   
        //console.log(res);
    }, []); 

    const handleGenreClick = async( genre_id ) => {
        setMovieByGenre( await fetchMovieByGenre(genre_id) );
    }

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return(
            <Carousel.Item key={index} style={{ height: 500}}>
                <div className="carousel-center">
                    <img style={{ height: 600}} src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-caption" 
                    style={{ textAlign: 'center', fontSize: 35 }}
                >
                    {item.title}
                </div>
            </Carousel.Item>
        )

    });

    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info mr-1 mb-1" onClick={()=> {
                    handleGenreClick(item.id)
                }}>
                {item.name}
            </button>
            </li>
        )
    });

    const movieList = movieByGenre.slice(0, 4).map((item, index)=> {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                        
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rated: {item.rating}</p> 
                    <ReactStars 
                        count={item.rating}
                        size={20}
                        isHalf={true}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        value={item.rating}
                        color={"#f4c10f"}
                    ></ReactStars>
                </div>
            </div>
        )
    });

    const trendingPersons = persons.slice(0, 4).map((p, i) => {
        return (
            <div className="col-md-3 col-sm-6" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={p.profileImg} alt={p.name}/>
                <p className="font-weight-bold text-center">{p.name}</p>
                <p className="font-weight-light text-center"
                    style={{color: "#5a606b"}}
                >
                    Trending for {p.known}
                </p>
            </div>
        )
    });

    const topRatedList = topRated.slice(0, 4).map((i, k) => {
        return (
            <div className="col-md-3 text-center" key={k}>
                <div className="card">
                    <Link to={`/movie/${i.id}`}>
                        <img className="img-fluid" src={i.poster} alt={i.title}/>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{i.title}</p>
                    <p>Rated: {i.rating}</p> 
                    <ReactStars 
                        count={i.rating}
                        size={20}
                        isHalf={true}
                        color={"#f4c10f"}
                        value={i.rating}
                    ></ReactStars>
                </div>
            </div>
        )
    })
    //console.log(movies);
    return (
       /* <div className="container">
            <div className="row">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4}
                        indicators={false}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>
        </div> */
        <div className="container">
            <Carousel className="w-100" style={{}}>
                {movies}
            </Carousel>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{movieList}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}>
                        TRENDING PERSONS ON THIS WEEK
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{trendingPersons}</div>
            
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}>
                        TOP RATED MOVIES
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">{topRatedList}</div>

            <div className="mt-5" style={{ borderTop: "1px solid #5a606b"}}></div>

            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{color: "#5a606b"}}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget posuere risus. Quisque sollicitudin elementum sem, quis mollis ipsum euismod id. Sed congue tortor ullamcorper leo faucibus pretium. Pellentesque porta ac ante at rhoncus. In nec neque a augue consectetur rhoncus. Nunc lobortis at mi in rutrum. Aenean luctus nisi vehicula urna facilisis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget posuere risus. Quisque sollicitudin elementum sem, quis mollis ipsum euismod id. Sed congue tortor ullamcorper leo faucibus pretium. Pellentesque porta ac ante at rhoncus. In nec neque a augue consectetur rhoncus. Nunc lobortis at mi in rutrum. Aenean luctus nisi vehicula urna facilisis.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{color: '#f4c10f'}}>
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color: '#f4c10f'}}>
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color: '#f4c10f'}}>
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{color: '#f4c10f'}}>
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{ color: "#5a606b"}}>
                    <h3>KEEP IN TOUCH</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i> Adress:</strong> 
                                    {" "}City,
                                    state, country
                                
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i> Phone:</strong> 
                                    {" "}+01 00 00 00
                                
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-envelope"></i> Email:</strong> 
                                    {" "}info@infoemail.com
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) 

}
export default Home;
