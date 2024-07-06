
import React, { useState } from 'react';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        console.log(response)
        return response.json();
      })
      .then(result => {
        setWeather(result);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setWeather(null);
      });
  };

  return (
    <div className="App relative flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-[url('../src/images/download.jpeg')]">
      <div className="overlay absolute top-0 left-0 w-full h-full bg-white bg-opacity-50"></div>
      <header className="App-header relative z-10 flex flex-col items-center">
        <h1 className="text-white text-3xl font-semibold mb-5">Saleem Talha</h1>
        <h1 className="text-white text-5xl font-bold mb-5">Weather Checker</h1>
        <div className="search-container mb-5">
          <input
            className="p-2 text-lg border border-gray-300 rounded mr-2"
            type="text"
            placeholder="Enter the City Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 text-lg rounded"
            onClick={searchPressed}
          >
            Search
          </button>
        </div>
        {weather && (
          <div className="weather-container bg-white bg-opacity-80 p-5 rounded text-center">
            <p className="location text-2xl font-bold mb-2">{weather.name}</p>
            <p className="temperature text-4xl font-bold">{weather.main.temp}°C</p>
            <div className="weather-condition mt-5">
              <p className="weather-main text-lg font-bold">{weather.weather[0].main}</p>
              <p className="weather-description italic">({weather.weather[0].description})</p>
            </div>
          </div>
        )}
        {error && <p className="error-message text-red-500 text-lg mt-5">{error}</p>}
      </header>
    </div>
  );
}

export default App;
