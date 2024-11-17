import axios from 'axios';

const AxiosPrivate = axios.create({
  baseURL:'http://localhost:5000/api/v1', 
  timeout: 10000, 
  headers: { 'Content-Type': 'application/json', 

  }, 
});

export default AxiosPrivate;