export const makeApiRequest = (movieID) => {
    // Replace this URL with your actual API endpoint
    const apiUrl = `https://www.omdbapi.com/?i=${movieID}&apikey=${process.env.REACT_APP_API_KEY}`;
  
    // Using the fetch API to make a GET request
    return fetch(apiUrl)
      .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
  
        // Parse the JSON response
        return response.json();
      })
      .catch(error => {
        // Handle any errors during the request
        console.error('API request error:', error);
        throw error; // Re-throw the error for the calling code to handle
      });
  };