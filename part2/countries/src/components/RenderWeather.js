import { useState } from "react"
import axios from "axios"




const getWeather = () => {
  axios
    .get(`${baseUrl}compact?lat=${lat}&lon=${lon}`, {headers})
    .then(response =>
      console.log(response.data)
    )
    .catch(error => console.log('Error retrieving data from server',error))
}
getWeather()