import React, { useState } from 'react';
import './App.css';

const apiWeather = {
  key: "8893f2341ef791019f7c107db8e627a3",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateCreator = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = input => {

    if (input.key === "Enter") {

      fetch(`${apiWeather.base}weather?q=${query}&units=metric&APPID=${apiWeather.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const checkWeather = () => {
    if (typeof weather.main != "undefined") {
      return "Exists";
    }
    else {
      return "undefined";
    }
  }


  return (
    <div className= {(typeof weather.main != "undefined")  ? ((weather.main.temp > 16) ? 'warm_backg' : 'app') : 'app'}>
      <section>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter Country....." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{dateCreator(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp,2)}°c
              </div>

              <div className="weather">{weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </section>
    </div>
  );
}

export default App;
