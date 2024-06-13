import Search from "./components/search/search";
import "./App.css";
import Currentweather from "./components/currentweather/currentweather";
import { openweatherurl, openweatherkey } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lon, lat] = searchData.value.split(" ");
    const currentweatherfetch = fetch(
      `${openweatherurl}/weather?lat=${lat}&lon=${lon}&appid=${openweatherkey}&units=metric`
    );
    const forecastweatherfetch = fetch(
      `${openweatherurl}/forecast?lat=${lat}&lon=${lon}&appid=${openweatherkey}&units=metric`
    );

    Promise.all([currentweatherfetch, forecastweatherfetch])
      .then(async (response) => {
        const weatherresponse = await response[0].json();
        const forecastresponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherresponse });
        setForecast({ city: searchData.label, ...forecastresponse });
      })
      .catch(console.log);
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Currentweather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
