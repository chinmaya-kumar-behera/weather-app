import Weather from './components/Weather';
import wallpaper from "./weather-wallpaper.png";

function App() {
  return (
    <div className="relative h-screen w-screen overflow-auto no-scrollbar">
      <div className="h-full w-full">
        <img
          alt="App wallpaper"
          className="h-full w-full object-cover object-center"
          src={wallpaper}
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-full overflow-scroll">
          <Weather />
      </div>
    </div>
  );
}

export default App;
