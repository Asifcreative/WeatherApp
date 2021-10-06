import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'


const WeatherApp = (props) => {

    function minmaxtemp(min, max) {
        return (
            <ul className="text-white">
                <li>Min-temp : <span className="px-1">{min ? min :'0'}&deg;</span></li>
                <li>Max-temp : <span className="px-1">{max ? max : '0'}&deg;</span></li>
            </ul>
        )
    }
    function error(){
        return(
          <div className="alert mx-5 text-white fs-5" role="alert">
            Please Enter city and Country!!
          </div>
        )
      }
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card glass" style={{ width: '30rem' }}>
                            <div className="card-body">
                                <div>{props.error ? error() : null}</div>
                                <h1 className="card-title text-danger">{props.city}</h1>
                                <h3 className="card-title text-white">
                                    <i className={`wi ${props.weatherIcon} display-4`}></i>&nbsp;
                                    <span>{props.celsius ? props.celsius : '0'}&deg;C</span>
                                </h3>
                                {minmaxtemp(props.temp_min, props.temp_max)}
                                {props.feel_like ? (<strong className="card-text text-danger">Feels like {props.feel_like}&deg;C. {props.main}. {props.description} </strong>): null}
                                <ul data-v-3208ab85="" data-v-3e6e9f12="" className="text-white weather-items text-container orange-side standard-padding">
                                    <li>{props.speed}m/s</li>
                                    <li>{props.pressure}hPa</li>
                                    <li>Humidity : {props.humidity}%</li>
                                    <li>Visibility : {props.visibility}km</li>
                                </ul>
                                <form onSubmit={props.loadWeather}>
                                    <div className="mb-3 input-data d-flex">
                                        <input type="text" name="city" class="form-now m-2 text-white" placeholder="City" />
                                        <input type="text" name="country" class="form-now m-2 text-white" placeholder="Country" />
                                    </div>
                                    <button type="submit" class="btn btn-danger">Get Weather</button>
                                </form>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </>

    )
}
WeatherApp.defaultProps = {
    cityName: 'wah',
}
WeatherApp.propTypes = {
    cityName: PropTypes.string,
}

export default WeatherApp
