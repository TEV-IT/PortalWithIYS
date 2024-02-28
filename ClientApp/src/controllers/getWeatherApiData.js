import UrlList from "library/url_list"
import Parameters from "library/parameters"
import axios from "axios"
const getWeatherApiData = async (cityName) =>{
    let response =await axios.get(`${UrlList.weatherApiBaseUrl}/forecast.json?q=${cityName}&key=${Parameters.WeatherApiKey}&lang=tr`)
    
    return response.data
} 
export default getWeatherApiData;