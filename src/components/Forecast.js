export default function Forecast(props) {
    function convertToF(celsius) {
        return (celsius * 9/5) + 32
    }

    const dailyElements = props.daily.map((forecast, index) => {
        const dateObject = props.dateFunc(forecast.dt)
        const day = dateObject.toLocaleString('en-us', {weekday:'long'})
        const icon = forecast.weather[0].icon
        const {max, min} = forecast.temp
        const unit = props.isMetric ? "C" : "F"

        return (
            <div key={index} className="daily-element">
                <p className="daily-day">{day}</p>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="daily-weather-icon"/>
                <div className="daily-range">
                    <p>{Math.round(props.isMetric ? max : convertToF(max))}°{unit}</p>
                    <p>{Math.round(props.isMetric ? min : convertToF(min))}°{unit}</p>
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