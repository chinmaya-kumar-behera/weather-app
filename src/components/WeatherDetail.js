import React from "react";
import Loader from "./Loader";

const WeatherDetail = ({ data, loading }) => {
  const currentDate = new Date();

  return (
    <div className="w-full lg:w-4/5 min-h-[400px] flex justify-center items-center backdrop-blur-md shadow-md rounded-xl p-5 z-10">
      {loading ? (
        <div className="flex flex-col items-center gap-2  ">
          <Loader />
          <h2>Fetching you details. Please wait...</h2>
        </div>
      ) : (
        <div className="w-full h-full ">
          <div className="w-full h-full">
            <div className="flex flex-col lg:flex-row gap-2 justify-between text-start">
              <div className="space-y-3">
                <h2 className="text-5xl font-semibold text-left">
                  {data.name}
                </h2>
                <div className="flex gap-3 items-center text-xs">
                  <span>
                    <strong>Longitude</strong> : {data.coord.lon}
                  </span>
                  <span>
                    <strong>Latitude</strong> : {data.coord.lat}
                  </span>
                </div>
              </div>

              <h6 className="text-sm font-semibold">
                updated as of {currentDate.getHours()}:
                {currentDate.getMinutes()}
              </h6>
            </div>
            <div className="mt-5">
              <div className="">
                <div className="flex justify-center items-center">
                  <section className="flex gap-5 items-center">
                    {data.weather && data.weather[0] && (
                      <img
                        src={`${process.env.REACT_APP_ICON_BASE_URL}/wn/${data.weather[0].icon}@4x.png`}
                        alt={data.weather[0].description}
                      />
                    )}
                  </section>
                  <div className="flex gap-4">
                    <h2 className="text-9xl">{parseInt(data?.main?.temp)}°</h2>
                    <div className="flex flex-col justify-center cursor-pointer">
                      <span className="font-bold text-4xl"> C</span>
                      <span className="font-normal text-2xl"> F</span>
                    </div>
                  </div>
                </div>
                <h5 className="text-lg">{data.weather[0].description}</h5>
              </div>

              <section className="grid grid-cols-3 text-gray-200 mt-10">
                <div className="flex flex-col items-start gap-2">
                  <span>
                    Wind Speed :{" "}
                    <span className="font-bold text-gray-100">
                      {parseInt(data.wind.speed)} Km/h
                    </span>
                  </span>
                  <span>
                    Feels Like :{" "}
                    <span className="font-bold text-gray-100">
                      {" "}
                      {parseInt(data.main.feels_like)}° C{" "}
                    </span>
                  </span>
                  <span>
                    Pressure :
                    <span className="font-bold text-gray-100">
                      {parseInt(data.main.pressure)}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span>
                    Humidity :{" "}
                    <span className="font-bold text-gray-100">
                      {parseInt(data.main.humidity)}%
                    </span>
                  </span>
                  <span>
                    Visibility :{" "}
                    <span className="font-bold text-gray-100">
                      {" "}
                      {parseInt(data.visibility)}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span>
                    Min Temp :{" "}
                    <span className="font-bold text-gray-100">
                      {data.main.temp_min} deg
                    </span>
                  </span>
                  <span>
                    Max Temp :{" "}
                    <span className="font-bold text-gray-100">
                      {" "}
                      {data.main.temp_max} deg
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-start gap-5">
                  <span> </span>
                  <span></span>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDetail;
