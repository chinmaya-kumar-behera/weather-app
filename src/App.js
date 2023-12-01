import Weather from './components/Weather';
import wallpaper from "./weather-wallpaper.png";

function App() {
  return (
    <div className='relative h-screen w-screen'>
      <img alt='App wallpaper' className='absolute top-0 left-0 h-full w-full object-cover object-center' src={wallpaper} />
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='h-full'>
        <Weather />
        </div>
      </div>
    </div> 
  );
}

export default App;
