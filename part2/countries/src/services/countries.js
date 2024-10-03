import axios from "axios"

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {getAll}

