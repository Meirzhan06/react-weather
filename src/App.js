import React, { useState } from 'react'
import './App.scss'
import error from './assets/image-9Z9UCAyuW-transformed.png'
import search from './assets/magnifying-glass-solid.svg'
import cloud from './assets/cloud.png'
import snow from './assets/snow.png'
import rain from './assets/rain.png'
import mist from './assets/mist.png'
import clear from './assets/clear.png'


export default function App(props) {

    

    const apiKey = 'bf0a31da5583476ea7db3976cb2bbd64'
    const [city, setCity] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')


    const [isClicked, setIsClicked] = useState(false)
    const [errorOccurred, setErrorOccurred] = useState(false);

    const [temperature, setTemperature] = useState()
    const [humidity, setHumidity] = useState()
    const [wind, setWind] = useState()
    const [description, setDescription] = useState()

    function buttonClick() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            if(city === ''){
                setErrorOccurred(true);
                setIsClicked(true);
            }
            else if (json.cod === '404') {
                setErrorOccurred(true);
                setIsClicked(true);
            } 
            
            else {
                setErrorOccurred(false)
                setIsClicked(true);
                setTemperature(parseInt(json.main.temp))
                setDescription(json.weather[0].description)
                setWind(json.wind.speed)
                setHumidity(json.main.humidity)
                console.log(json.weather[0].main)
                switch(json.weather[0].main){
                    case 'Clouds':             
                        setWeatherIcon(cloud)
                        break;
                    case 'Snow':
                        setWeatherIcon(snow)
                        break;
                    case 'Rain':
                        setWeatherIcon(rain)
                        break;
                    case 'Clear':
                        setWeatherIcon(clear)
                        break;
                    case 'Mist':
                        setWeatherIcon(mist)
                        break;
                }
            }
        });
    }


  return (
    <div className='wrapper'>
        <div className={`container ${isClicked ? 'active' : ''}`}>
            <div className='search-box'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                <input type="text" placeholder='Enter You Location...' onChange={(e) => {setCity(e.target.value)}}/>
                <button onClick={buttonClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
            </div>

            <div className={`not-found ${errorOccurred ? 'fadeIn' : ''}`}>
                <img src={error} alt="" />
                <p>Oops! Invalid location :(</p>
            </div>

            <div className={`weather-box ${errorOccurred ? 'active' : ''}`}>
                <img src={weatherIcon} alt="" />
                <p className='temperature'>{temperature}<sup>°C</sup></p>
                <p className='description'>{description}</p>
            </div>

            <div className={`weather-details ${errorOccurred ? 'active' : ''}`}>
                <div className='humidity'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"/></svg>
                    <div className='text'>
                        <span>{humidity}%</span>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className='wind'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
                    <div className='text'>
                        <span>{wind}Km/h</span>
                        <p>Wind Speed</p>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}
