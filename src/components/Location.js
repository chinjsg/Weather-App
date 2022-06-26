import {useState, useEffect} from "react"

export default function Location (props) {

    // console.log(props.location)
    const {name, state, country} = props.location

    const options = props.options.map((loc, index) => {
        // const {lat, lon} = loc
        return (
            <button
                key={index}
                type="button"
                className="search-content-option"
                onMouseDown={() => props.changeCity(loc)}
            >
                {loc.name}{loc.state && (", " + loc.state)}{loc.country && (", " + loc.country)}
            </button>
        )
    })

    // const {name, state, country} = location

    return (
        <div className="header">
            <div className="location">
                <h1 className="location-label">{name}</h1>
                <span className="location-country">{state && state + ", "}{country}</span>
            </div>
            
            <div className="search">
                <div className="toggle">
                    <label htmlFor="unitToggle">{props.isMetric ? "Celsius" : "Fahrenheit"}</label>
                    <input type="checkbox" className="checkbox" id="unitToggle" checked={props.isMetric} onChange={props.handleToggle}/>
                </div>
                <input type="text" placeholder="Enter location" className="search-bar" onChange={props.search} onFocus={props.onFocus} onBlur={props.onBlur} value={props.text}/>
                {props.options.length > 0 && props.focused && <div className="search-content">{options}</div>}
            </div>
        </div>
    )
}