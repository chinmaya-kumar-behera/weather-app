import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import WeatherDetail from "./WeatherDetail";
import WeeklyForeCast from "./WeeklyForeCast";
import Header from "./Header";

const Weather = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();

  const fetchData = async () => {
    if (!navigator.onLine) {
      toast.error("No internet connection. Please check your network.");
      setLoading(false);
      return;
    }
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async function (position) {
      const newLat = position.coords.latitude;
      const newLong = position.coords.longitude;

      const currentWeatherResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${newLat}&lon=${newLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      setCurrentData(currentWeatherData);

      const currentDate = new Date();
      const firstDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );

      const lastDayOfWeek = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + 6
      );

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (loading) return;
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/weather?q=${searchTerm}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      if (data.cod && data.cod === "404") {
        toast.error("City not found. Please enter a valid city name.");
      } else {
        setCurrentData(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data by city name:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      if (search) {
        handleSearch(search);
      } else fetchData();
      toast.success("Nice, You are connected.");
    };
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  });

  return (
    <div className="h-full text-white">
      <Header onSearch={handleSearch} setSearchTerm={setSearch} searchTerm={search} />
      <div className="h-full text-center bg-gray-900 bg-opacity-40 py-16 overflow-auto">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-3 lg:px-0">
          <WeatherDetail data={currentData} loading={loading} />
          <WeeklyForeCast data={forecastData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
