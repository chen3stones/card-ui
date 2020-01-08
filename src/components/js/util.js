import axios from 'axios'

export default{
/* eslint-disable */
  getUserIfo: function (info) {
    axios.get('/api/user/info',
      {
        params: {
          id: -1
        }
      })
      .then(result => {
        if (result.data.code === 200) {
          let data = result.data.data
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
          alert(result.data.message)
        }
      })
  }
}
