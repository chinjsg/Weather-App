import {useState, useEffect} from "react"
import Location from "./components/Location"
import Main from "./components/Main"
import Forecast from "./components/Forecast"
import './style.css';

function App() {
    const key = "";

    const default_city = {
        "name": "Tucson",
        "local_names": {
            "en": "Tucson",
            "he": "טוסון",
            "ru": "Тусон",
            "uk": "Тусон",
            "ar": "توسان"
        },
        "lat": 32.2228765,
        "lon": -110.9748477,
        "country": "US",
        "state": "Arizona"
    }

    const [city, setCity] = useState(default_city)
    const [data, setData] = useState({})
    const [options, setOptions] = useState([])
    const [searchText, setSearchText] = useState("")
    const [focused, setFocused] = useState(false)
    const [isMetric, setIsMetric] = useState(true)

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    useEffect(() => changeCity(city), [])

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

    function changeCity(location) {
        const {lat, lon} = location

        console.log(`City changing to lat: ${lat} lon: ${lon}`)
        const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${key}`
        fetch(weather_url)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
        
        clearSearch()
        setCity(location)
    }

    function handleToggle() {
        setIsMetric(!isMetric)
    }

    function convertUnixToDate(unix_timestamp) {
        const milliseconds = unix_timestamp * 1000
        return new Date(milliseconds)
    }

    return (
        Object.keys(data).length === 0
        ? 
        <div className="container">loading...</div>
        :
        <div className="container">
            <Location location={city} isMetric={isMetric} handleToggle={handleToggle} options={options} search={searchChange} changeCity={changeCity} text={searchText} clearSearch={clearSearch} focused={focused} onFocus={onFocus} onBlur={onBlur}/>
            <Main today={data.current} todayForecast={data.hourly.slice(1, 26)} todayRange={data.daily[0]} isMetric={isMetric} dateFunc={convertUnixToDate}/>
            <Forecast daily={data.daily.slice(1)} isMetric={isMetric} dateFunc={convertUnixToDate}/>
        </div>
    );
}

export default App;
