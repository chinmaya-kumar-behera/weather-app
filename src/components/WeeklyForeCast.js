import React  from "react";
import Loader from "./Loader";

const WeeklyForeCast = ({ loading, data }) => {
  console.log(data)

  const getWeatherIconUrl = (iconCode) => {
    return `${process.env.REACT_APP_ICON_BASE_URL}/wn/${iconCode}@4x.png`;
  };
  return (
    <div className="w-full lg:w-1/5 shadow-md p-5 backdrop-blur-lg text-center rounded-xl">
      <h3 className="text-xl font-semibold">Weekly Forecast</h3>
      <div className="flex flex-col gap-2 mt-5 text-gray-100 items-center justify-center">
        {loading ? (
          <Loader />
        ) : ( data &&
          data.map((forecast, index) => (
            <div key={index} className="w-full p-2 border-b">
              <div className="w-full flex justify-start">
                <h4 className="text-xs font-semibold">
                  {new Date(forecast.dt * 1000).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </h4>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-3">
                  <p className="text-gray-200 text-xs">
                    <strong> {parseInt(forecast.main.temp)}° C</strong>
                  </p>
                  <p className="text-gray-300 text-xs">
                    {forecast.weather[0].description}
                  </p>
                </div>
                <div className="">
                  {forecast.weather && forecast.weather[0] && (
                    <img
                      src={getWeatherIconUrl(forecast.weather[0].icon)}
                      alt={forecast.weather[0].description}
                      className="mx-auto h-10"
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeeklyForeCast;
