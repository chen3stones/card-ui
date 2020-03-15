import axios from 'axios'

export default{
/* eslint-disable */
  getUserIfo: function (info,id) {
    axios.get('/api/user/info',
      {
        params: {
          id: id
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
          info.score = data.score
          info.balance = data.balance
          info.status = data.status
        } else {
          alert(result.data.message)
        }
      })
  },

  getAllGoodType() {
    axios.get('/api/goods/typeList')
      .then(result => {
        if(result.data.code === 200) {
           return  result.data.data
        } else {
          this.$message.error("获取商品列表失败")
          return [];
        }
      })
  }
}
