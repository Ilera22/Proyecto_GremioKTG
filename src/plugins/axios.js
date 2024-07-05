import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.example.com', // Reemplaza con la URL base de tu API
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default instance