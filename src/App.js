import Location from "./components/Location"
import Main from "./components/Main"
import Forecast from "./components/Forecast"
import './style.css';
import onecall from "./testData/onecall"

function App() {

    function convertUnixToDate(unix_timestamp) {
        const milliseconds = unix_timestamp * 1000
        return new Date(milliseconds)
    }

    const weatherData = {}
    function setWeatherData(result) {
        weatherData = result
    }

    // For Portland Oregon US 
    // "lat": 45.5202471,
    // "lon": -122.6741949,

    const key = "";
    const lat = "45.5202471"
    const lon = "-122.6741949"

    const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=Portland&limit=5&appid=${key}`
    
    // fetch(url)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    return (
        <div className="container">
            <Location />
            <Main today={onecall.current} todayForecast={onecall.hourly.slice(1, 26)} todayRange={onecall.daily[0]} dateFunc={convertUnixToDate}/>
            <Forecast daily={onecall.daily.slice(1)} dateFunc={convertUnixToDate}/>
        </div>
    );
}

export default App;
