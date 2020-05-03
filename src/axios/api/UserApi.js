import service from '../request'
export const getUserInfo = function(id){
  return service({
    url: '/api/user/info',
    method: 'get',
    params: {
      id: id
    }
  })
}
