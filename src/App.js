import './App.css';
import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import WeatherApp from './components/WeatherApp';
import { BrowserRouter as Router } from "react-router-dom";
import "weather-icons/css/weather-icons.css";

const App = () => {
  const apiKey = process.env.REACT_APP_WEATHER_API
  const [weatherIcon, setWeatherIcon] = useState({
        Thunderstrom  : "wi-thunderstorm",
        Drizzle       : "wi-sleet",
        Rain          : "wi-storm-showers",
        Snow          : "wi-snow",
        Atmosphere    : "wi-fog",
        Clear         : "wi-day-sunny",
        Clouds        : "wi-day-fog",
  });
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [temp_max, setTemp_max] = useState(undefined);
  const [temp_min, setTemp_min] = useState(undefined);
  const [feel_like, setFeel_like] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [pressure, setPressure] = useState(undefined);
  const [speed, setSpeed] = useState(undefined);
  const [visibility, setVisibility] = useState(undefined);
  const [error, setError] = useState(false);

  function calCelsious(temp){
    let cell =Math.floor(temp-273.15)
    return cell;
  }
  function get_weatherIcon(icons,rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <=232:
        setWeatherIcon(weatherIcon.Thunderstrom);
        break;
      case rangeID >= 300 && rangeID <=321:
        setWeatherIcon(weatherIcon.Drizzle);
        break;
      case rangeID >= 500 && rangeID <=531:
        setWeatherIcon(weatherIcon.Rain);
        break;
      case rangeID >= 600 && rangeID <=622:
        setWeatherIcon(weatherIcon.Snow);
        break;
      case rangeID >= 701 && rangeID <=781:
        setWeatherIcon(weatherIcon.Atmosphere);
        break;
      case rangeID === 800 :
        setWeatherIcon(weatherIcon.Clear);
        break;
      case rangeID >= 801 && rangeID <=804:
        setWeatherIcon(weatherIcon.Clouds);
        break;
        default:
        setWeatherIcon(weatherIcon.Clouds);
    }
  }
  const weatherUpdate= async (e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=56b84b16d9ef917f11d625dd45d8a46f`;
    let data = await fetch(url);
    let parsedData = await data.json();
        setCity(`${parsedData.name},${parsedData.sys.country}`);
        // setCountry(parsedData.sys.country);
        setCelsius(calCelsious(parsedData.main.temp));
        setTemp_max(calCelsious(parsedData.main.temp_max));
        setTemp_min(calCelsious(parsedData.main.temp_min));
        setFeel_like(calCelsious(parsedData.main.feels_like));
        setDescription(parsedData.weather[0].description);
        setMain(parsedData.weather[0].main);
        setHumidity(parsedData.main.humidity);
        setPressure(parsedData.main.pressure);
        setSpeed(parsedData.wind.speed);
        setVisibility(parsedData.visibility);

        get_weatherIcon(weatherIcon,parsedData.weather[0].id);
        console.log(parsedData);
    }else{
      setError(true);
    }
  }
//   useEffect(() => {
//     // weatherUpdate();
// }, []);

  return (
    <div>
      <Router>
        <NavBar class="nav-link active" />
        <WeatherApp apiKey={apiKey}
        city={city}
        country={country}
        celsius={celsius}
        temp_max={temp_max}
        temp_min={temp_min}
        description={description}
        feel_like={feel_like}
        main={main}
        humidity={humidity}
        pressure={pressure}
        speed={speed}
        visibility={visibility/1000}
        weatherIcon={weatherIcon}
        loadWeather={weatherUpdate}
        error={error}
        />
        <Footer />
      </Router>
    </div>
  )
}

export default App;
