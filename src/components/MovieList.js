import React, {useState} from 'react';
import { makeApiRequest } from './Api'; 


const MovieList = (props) => {

	const [apiResponse, setApiResponse] = useState(null);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const handleOverlayHover = (movieID) => {
		// Make the API request when the overlay is hovered
		makeApiRequest(movieID)
		  .then((response) => {
			// Handle the API response and update state
			console.log('API response:', response);
			setApiResponse(response); // Store the response in the state
			setIsOverlayOpen(true);
		  })
		  .catch((error) => {
			// Handle API error if needed
			console.error('API request error:', error);
		  });
	  };

	const handleOverlayLeave = () => {
		// Do something when the mouse leaves the overlay
		setIsOverlayOpen(false);
	};

    const FavouriteComponent = props.favouriteComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div key={movie.imdbID} className='d-flex justify-content-start m-2 custom-movie'>
					<img src={movie.Poster} alt='movie' className='list-movie'/>
					<div className='info-overlay align-items-center justify-content-center'>
						<div
							className={`info-overlay ${isOverlayOpen ? 'open' : ''}`}
							onMouseEnter={() => handleOverlayHover(movie.imdbID)}
							onMouseLeave={handleOverlayLeave}
						>
							{/* Your component content */}
							<h5>{movie.Title}</h5>
							<hr/>
							<ul>
								<li>{movie.Year}</li>
								<li>{apiResponse && apiResponse.Runtime}</li>
							</ul>
							{apiResponse && apiResponse.Director && <p><b>Director:</b> {apiResponse.Director}</p>}
							{apiResponse && apiResponse.imdbRating && <p><b>IMDB:</b> {apiResponse.imdbRating}</p>}
							{apiResponse && apiResponse.Genre && <p><b>Genre:</b> {apiResponse.Genre}</p>}
							{apiResponse && apiResponse.Actors && <p><b>Actors:</b> {apiResponse.Actors}</p>}
							{apiResponse && apiResponse.Plot && <p>{apiResponse.Plot}</p>}
						</div>
					</div>
                    <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent/>
                    </div>
				</div>
			))}
		</>
	);
};

export default MovieList;