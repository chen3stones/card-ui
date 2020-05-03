import axios from 'axios'
import qs from 'qs'
/**
 * 初始axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})
/**
 * request拦截器=》对请求参数进行处理
 */
service.interceptors.request.use(config => {
  config.method === 'post'
    ? config.data = qs.stringify({...config.data})
    : config.params = {...config.params};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
}, error => {  //请求错误处理
  this.$message.error('系统开小差啦')
  Promise.reject(error)
});
/**
 * reqeust拦截器 =》 对请求参数进行处理
 */
service.interceptors.response.use(
  response => {
    if(response.data.code === 200) {
      return response.data
    } else {
      if(response.data.info !== '') {
        this.$message.error(response.data.info)
      }else if(response.data.message !== '') {
        this.$message.error(response.data.message)
      }else {
        this.$message.error('系统开小差啦，请联系管理员')
      }
    }
  },
  error => {
    this.$router.push('/login').then(r => console.log(r))
    console.log(JSON.parse(JSON.stringify(error)))
    switch (JSON.parse(JSON.stringify(error))) {
      case 401:
        this.$message.error('权限不足')
        break
      default:
        console.log(error)
    }
    return error.response.data
  }
);
export default service
