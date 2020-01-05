import axios from 'axios'

export default{
/* eslint-disable */
  test: function (info) {
    var id = (window.parent.location.href.split('=')[1])
    axios.get('/api/user/info',
      {
        params: {
          id: id
        }
      })
      .then(result => {
        if (result.data.code !== 200) {
          let data = result.data
          info.name = data.name
          if(data.phone !== '') {
            info.phone = data.phone
          }
          if(data.mail !== '') {
            info.mail = data.mail
          }
          info.sex = data.sex
          info.sex = data.sex
          info.score = data.score
          info.balance = data.balance

        } else {
          callback()
        }
      })
  }
}
