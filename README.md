# Weather App
This Weather App allows users to check the current weather and weekly forecast for a specific city. Users can search for weather details by entering the city name or allowing the app to use their current location.

## click here to visit the app :  [Visit App](https://weather.chinmaya.vercel.app/)

# App Image
![image](https://github.com/chinmaya-kumar-behera/weather-app/assets/101429530/ef25ed2e-5a60-479f-b12d-7a40af13e915)

# Features:
Display current weather details including temperature, weather condition, wind speed, humidity, and more.
Show a weekly forecast with temperature and weather condition for the upcoming days.
Search for weather details by city name.
Responsive design for a seamless experience on various devices.

# Features made the weather app unique than other
Showing "Internet is not connected" alert, if you are not connected with internet.

Loading the data automatically on conneting to the internet.

# Technologies Used:
React.js
Tailwind CSS
OpenWeatherMap API for weather data
Geolocation API for fetching user's current location

# Installation:

1.Clone the repository:
``` bash
git clone <repository-url>
```

2.Navigate to the project directory:
``` bash
cd weather-app
```

3.Install dependencies:
``` bash
npm install
```
4.Create a .env file in the root directory and add your OpenWeatherMap API key:
REACT_APP_API_KEY=your-openweathermap-api-key
REACT_APP_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_ICON_BASE_URL=https://openweathermap.org/img

5.Start the development server:
``` bash
npm start
```

Open your browser and visit http://localhost:3000 to view the app.
Usage:
Upon launching the app, the current weather and weekly forecast for your current location will be displayed.
Use the search input field to search for weather details by city name.
Press Enter or click the Search button to initiate the search.
The app will display the current weather and weekly forecast for the entered city.
