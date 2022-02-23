import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 封装了axios请求的过程
// create an axios instance
const service = axios.create({
  baseURL: window.APP_CONFIG.baseApi, // url = base url + request url 设置基地址
  // withCredentials: true, // send cookies when cross-domain requests
  // 在.env.development / .env.production里面修改
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  // 请求拦截器：在请求之前进行一些配置。比如：携带token的访问
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken() // 设置token的headers，并获取token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 响应拦截器
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const code = response.status
    if (response.status === 200) {
      return response
    }

    // if the custom code is not 200, it is judged as an error.
    if (code !== 200) {
      console.log(response)
      return Promise.reject(new Error('Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
