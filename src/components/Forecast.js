export default function Forecast(props) {
    const dailyElements = props.daily.map(forecast => {
        const dateObject = props.dateFunc(forecast.dt)
        const day = dateObject.toLocaleString('en-us', {weekday:'long'})
        const icon = forecast.weather[0].icon
        const {max, min} = forecast.temp

        return (
            <div className="daily-element">
                <p className="daily-day">{day}</p>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="daily-weather-icon"/>
                <div className="daily-range">
                    <p>{Math.round(max)}°F</p>
                    <p>{Math.round(min)}°F</p>
                </div>
            </div>
        )
    })

    return (
        <div className="forecast">
            <h2>Forecast</h2>
            <div className="forecast-week">
                {dailyElements}
            </div>
        </div>
    )
}