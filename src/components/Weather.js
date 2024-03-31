import React, { useState, useEffect } from "react";
import WeatherDetail from "./WeatherDetail";
import WeeklyForeCast from "./WeeklyForeCast";
import Header from "./Header";

const Weather = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [currentDate, setCurrentDate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const newLat = position.coords.latitude;
        const newLong = position.coords.longitude;

        const currentWeatherResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${newLat}&lon=${newLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        );
        const currentWeatherData = await currentWeatherResponse.json();

        setCurrentData(currentWeatherData);
        
        setCurrentDate(new Date());

        const currentDate = new Date();
        const firstDayOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        );

        // Get the end date of the current week
        const lastDayOfWeek = new Date(
          firstDayOfWeek.getFullYear(),
          firstDayOfWeek.getMonth(),
          firstDayOfWeek.getDate() + 6
        );

        // Fetch forecast data for the current week
        const forecastResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/forecast/?lat=${newLat}&lon=${newLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        );
        const forecastWeatherData = await forecastResponse.json();

        const uniqueDates = new Set();
        const currentWeekData = forecastWeatherData.list.filter((forecast) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const dateString = forecastDate.toDateString();

          if (!uniqueDates.has(dateString)) {
            uniqueDates.add(dateString);
            return (
              forecastDate >= firstDayOfWeek && forecastDate <= lastDayOfWeek
            );
          }

          return false;
        });

        setForecastData(currentWeekData);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div className="h-full text-white">
      <Header setSearch={setSearch} search={search} />
      <div className="h-full text-center bg-gray-900 bg-opacity-40 overflow-auto py-16">
        <div className="max-w-7xl mx-auto flex gap-10">
          <WeatherDetail data={currentData} loading={loading} />
          <WeeklyForeCast data={forecastData}  loading={loading}/>
        </div>
      </div>
    </div>
  );
};

export default Weather;
