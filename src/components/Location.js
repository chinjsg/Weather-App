import {useState} from "react"

export default function Location (props) {
    const options = props.options.map((loc, index) => {
        const {lat, lon} = loc
        return (
            <button
                key={index}
                type="button"
                className="search-content-option"
                onMouseDown={() => {
                    props.clearSearch()
                    props.changeCity(lat, lon)}
                }
            >
                {loc.name}{loc.state && (", " + loc.state)}{loc.country && (", " + loc.country)}
            </button>
        )
    }
    )

    return (
        <div className="header">
            <div className="location">
                <h1 className="location-label">Portland</h1>
                <span className="location-country">OREGON, United States</span>
            </div>
            
            <div className="search">
                <input type="text" placeholder="Enter location" className="search-bar" onChange={props.search} onFocus={props.onFocus} onBlur={props.onBlur} value={props.text}/>
                {props.options.length > 0 && props.focused && <div className="search-content">{options}</div>}
            </div>
        </div>
    )
}