import React, {useState}  from "react";
import Header from "./Header";
import axios from "axios";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Context from "../Context";
import Error from "./Error";
import DateTime from "./DateTime";


const Main = () => {
    const [weather, setWeather] = useState(null);
    const [city,setCity] = useState();
    const [error,setError] = useState();

    const api_call = async (e) => {
        e.preventDefault()
        const location = e.target.elements.location.value

        if (!location) {
            return setError('Please enter some name'), setWeather(null)
        }
        const API_KEY = 'f052bde16f681ed8533ca7f58830b1de'
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        const request = axios.get(URL)
        const response = await request
        setWeather(response.data.main)
        setCity(response.data.name)
        setError(null)
        console.log(response.data)
        console.log(response.data.name)
    }
    
    return (
        <div className = "main">
        <Header/>
        <Content>
            <Context.Provider value = {{ api_call, weather, city}}>
            <WeatherSearch/>
            { weather !== null && <WeatherData/> }
            { error !== null && <p>{<Error error={error}/>}</p> }
            </Context.Provider>
            <DateTime/>
        </Content>
        </div>
    )
}

export default Main