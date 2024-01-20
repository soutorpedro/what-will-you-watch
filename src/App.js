import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import ProjectBy from './components/ProjectBy';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState ('');

  async function getMovieRequest(searchValue){
    const apiUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(apiUrl);
    const responseJson = await response.json();  
    
    if (responseJson.Search) {
      const movieResults = responseJson.Search.filter(
        (result) => result.Type === 'movie'
      );
      const showResults = responseJson.Search.filter(
        (result) => result.Type === 'series'
      );
      setMovies(movieResults);
      setShows(showResults);
    }else {
      // Clear movies and shows when no results
      setMovies([]);
      setShows([]);
    }
  }

  //useEffect always gets called in the first render
  //so the [searchValue] forces it to wait for when it receives the searchValue input 
  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourites || []);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    // Check if the movie is already in the favorites list
    const isAlreadyInFavorites = favourites.some((favorite) => favorite.imdbID === movie.imdbID);
  
    if (!isAlreadyInFavorites) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  };
  
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID);
    
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
      <div className='container movie-app'>
        
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading="what will you watch" />
            <ProjectBy />
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          {movies && movies.length > 0 && (
          <>
            <div className='row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading subheading="Movies" />
            </div>
            <div className='row movie-row'>
              <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
            </div>
            <div className="row-divider"></div>
          </>
          )}

          {shows && shows.length > 0 && (
          <>
            <div className='row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading subheading="Shows" />
            </div>
            <div className='row movie-row'>
              <MovieList movies={shows} favouriteComponent={AddFavourites} />
            </div>
            <div className="row-divider"></div>
          </>
          )}
          
          {favourites && favourites.length > 0 && (
          <>
            <div className='row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading subheading="Favourites" />
            </div>
            <div className='row movie-row'>
              <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
            </div>
            <div className="row-divider"></div>
          </>
          )}
      </div>
  );
}

export default App;
