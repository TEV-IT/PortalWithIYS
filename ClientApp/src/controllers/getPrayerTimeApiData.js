//http://api.aladhan.com/v1/timingsByAddress?address=Hatay
import UrlList from "library/url_list"
import Parameters from "library/parameters"
import axios from "axios"
const getPrayerTimeApiData= async(cityName)  =>{
    let response = await axios.get(`${UrlList.prayerTimeApiBaseUrl}/timingsByAddress?address=${cityName}`)
    
    return response.data.data
}
export default getPrayerTimeApiData