import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
})

instance.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (response) => {
    if (response?.status == 200) {
      return response?.data
    } else {
      return {
        code: '-1',
        msg: '未知错误',
        data: null,
      }
    }
  },
  (err) => Promise.reject(err)
)

export default instance
