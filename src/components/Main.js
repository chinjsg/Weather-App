export default function Main(props) {
    const {dt, temp, feels_like, pressure, humidity, visibility, wind_speed} = props.today
    const {description, icon} = props.today.weather[0]
    const hourlyData = props.todayForecast
    const {min, max} = props.todayRange.temp

    function getTimeFromDate(dateObject, hasMinutes) {
        let hours = dateObject.getHours()
        let minutes = dateObject.getMinutes()
        let ampm = hours >= 12 ? "pm" : "am"
        hours = hours === 0 || hours === 12 ? 12 : hours % 12
        minutes = minutes < 10 ? "0" + minutes : minutes

        if (hasMinutes) {
            return hours + ":" + minutes + " " + ampm
        } else {
            return hours + " " + ampm
        }
    }

    const hourlyElements = hourlyData.map(hour => {
        const dateObject = props.dateFunc(hour.dt)
        const time = getTimeFromDate(dateObject, false)
        const temp = hour.temp
        const icon = hour.weather[0].icon

        return (
            <div className="hourly-element">
                    <p>{time}</p>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="current-forecast-icon"/>
                    <p>{Math.round(temp)}°F</p>
                </div>
        )
    })

    const dateObject = props.dateFunc(dt)
    const day = dateObject.toLocaleString('en-us', {weekday:'long'})
    const time = getTimeFromDate(dateObject, true)

    return (
        <div className="current">
            <h2 className="date">{day}, {time}</h2>

            <div className="temperature">
                <div className="weather">
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="weather-icon" />
                    <p className="weather-condition">{description}</p>
                </div>
                <div className="temperature-range">
                <p className="temperature-max">{Math.round(max)}°F</p>
                    <p className="temperature-min">{Math.round(min)}°F</p>
                </div>
                <div className="temperature-main">
                    <p className="temperature-current">{Math.round(temp)}°F</p>
                    <p className="temperature-apparent">Feels like {Math.round(feels_like)}°F</p>
                </div>
            </div>

            <div className="current-forecast">
                {hourlyElements}
            </div>
            
            <div className="information">
                <div>
                    <p className="humidity">{humidity}%</p>
                    <p>Humidity</p>
                </div>
                <div>
                    <p className="windspeed">{wind_speed} mph</p>
                    <p>Wind</p>
                </div>
                <div>    
                    <p className="pressure">{pressure} hPa</p>
                    <p>Pressure</p>
                </div>
                <div>    
                    <p className="visibility">{visibility/1000} km</p>
                    <p>Visibility</p>
                </div>
                
            </div>
        </div>
    )
}