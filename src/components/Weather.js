import React, { useState, useEffect } from "react";

const Weather = () => {
  const [currentData, setCurrentData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [currentDate, setCurrentDate] = useState();

useEffect(() => {
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const newLat = position.coords.latitude;
      const newLong = position.coords.longitude;

      // Fetch current weather data
      const currentWeatherResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${newLat}&lon=${newLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentData(currentWeatherData);
      setCurrentDate(new Date());

      // Calculate the date of 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Fetch forecast data for the previous 7 days
      const forecastResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/forecast/?lat=${newLat}&lon=${newLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      
      const forecastWeatherData = await forecastResponse.json();

      // Filter forecast data to include only the previous 7 days
      const filteredForecastData = forecastWeatherData.list.filter(
        (forecast) => new Date(forecast.dt * 1000) >= sevenDaysAgo
      ).slice(0, 7);

      setForecastData(filteredForecastData);
    });
  };

  fetchData();
}, []);

  const getWeatherIconUrl = (iconCode) => {
    return `${process.env.REACT_APP_ICON_BASE_URL}/wn/${iconCode}@4x.png`;
  };

  return (
    <div className="h-full text-center text-white bg-gray-900 bg-opacity-40">
      <header className="h-16 bg-gray-100 bg-opacity-20">
        <div className="h-full flex justify-between items-center px-10">
          <div>
            <strong className="text-xl">Weather App</strong>
          </div>
          <div className="">
            <input type="text" placeholder="Enter City" className="px-3 py-2 text-gray-700 rounded-sm outline-none border-none"/>
          </div>
        </div>
      </header>
      {currentData && (
        <div className="flex justify-center items-center space-y-5">
          <div className="">
            <h2 className="text-4xl">{currentData.name}</h2>
            <section className="flex gap-5 items-center">
              {currentData.weather && currentData.weather[0] && (
                <img
                  src={`${process.env.REACT_APP_ICON_BASE_URL}/wn/${currentData.weather[0].icon}@4x.png`}
                  alt={currentData.weather[0].description}
                />
              )}
              <div className="flex gap-4">
                <h2 className="text-9xl">
                  {parseInt(currentData?.main?.temp)}°
                </h2>
                <div className="flex flex-col justify-center cursor-pointer">
                  <span className="font-bold text-4xl"> C</span>
                  <span className="font-normal text-2xl"> F</span>
                </div>
              </div>
            </section>

            <section className="">
              <h5 className="text-2xl">{currentData.weather[0].description}</h5>
              <h6 className="text-sm font-semibold">
                updated as of {currentDate.getHours()}:
                {currentDate.getMinutes()}
              </h6>
            </section>

            <section className="space-y-3 mt-5 font-semibold text-lg">
              <div className="flex gap-5">
                <span>Wind Speed {parseInt(currentData.wind.speed)} Km/h</span>
                <span>
                  Feels Like {parseInt(currentData.main.feels_like)}° C
                </span>
                <span>Pressure {parseInt(currentData.main.pressure)}</span>
              </div>
              <div className="flex gap-5">
                <span>Humidity {parseInt(currentData.main.humidity)}%</span>
                <span>visibility {parseInt(currentData.visibility)}</span>
              </div>
            </section>
          </div>
        </div>
      )}

      {forecastData && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Weekly Forecast</h3>
          <div className="flex justify-center items-center space-x-4 overflow-x-auto no-scrollbar">
            {forecastData.map((forecast, index) => (
              <div
                key={index}
                className="text-center bg-gray-200 bg-opacity-20 min-w-[150px] p-2 rounded"
              >
                <h4>{new Date(forecast.dt).toDateString()}</h4>
                <p>{parseInt(forecast.main.temp)}° C</p>
                {forecast.weather && forecast.weather[0] && (
                  <img
                    src={getWeatherIconUrl(forecast.weather[0].icon)}
                    alt={forecast.weather[0].description}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
