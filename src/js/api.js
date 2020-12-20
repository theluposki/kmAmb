import axios from 'axios';

const token = localStorage.getItem('token')

const Api = axios.create({
  baseURL: `https://km-amb-backend.herokuapp.com`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export default Api