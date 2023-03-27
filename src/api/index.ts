import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3006/api',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)

export default request
