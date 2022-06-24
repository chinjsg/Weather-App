import {useState} from "react"
import Location from "./components/Location"
import Main from "./components/Main"
import Forecast from "./components/Forecast"
import './style.css';
import onecall from "./testData/onecall"

function App() {
    const [city, setCity] = useState({})
    const [data, setData] = useState(onecall)
    const [options, setOptions] = useState([]) // replace geocoding parameter
    const [searchText, setSearchText] = useState("")
    const [focused, setFocused] = useState(false) 

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const key = "";

    function searchChange(event) {
        const searchString = event.target.value
        if (searchString.length > 0) {
            const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchString}&limit=5&appid=${key}`
            fetch(geo_url)
            .then(response => response.json())
            .then(response => setOptions(response))
            .catch(err => console.error(err));
        } else {
            setOptions([])
        }
        setSearchText(searchString)
    }

    function clearSearch() {
        setSearchText("")
        setOptions([])
    }

    function changeCity(lat, lon) {
        // console.log(`City changing to lat: ${lat} lon: ${lon}`)
        const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${key}`
    }

    function convertUnixToDate(unix_timestamp) {
        const milliseconds = unix_timestamp * 1000
        return new Date(milliseconds)
    }

    // const weatherData = {}
    // function setWeatherData(result) {
    //     weatherData = result
    // }

    // const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    // const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=Portland&limit=5&appid=${key}`
    
    // fetch(url)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    return (
        <div className="container">
            <Location options={options} search={searchChange} changeCity={changeCity} text={searchText} clearSearch={clearSearch} focused={focused} onFocus={onFocus} onBlur={onBlur}/>
            <Main today={data.current} todayForecast={data.hourly.slice(1, 26)} todayRange={data.daily[0]} dateFunc={convertUnixToDate}/>
            <Forecast daily={data.daily.slice(1)} dateFunc={convertUnixToDate}/>
        </div>
    );
}

export default App;
