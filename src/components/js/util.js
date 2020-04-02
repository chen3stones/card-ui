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
  },
  deepClone(initalObj){
    const obj = {};
    if(typeof initalObj !== 'object'){
      return initalObj
    }
    for (const key in initalObj) {
      if (typeof initalObj[key] === 'object') {
        //对数组特殊处理
        if (Array.isArray(initalObj[key])) {
          //用map方法返回新数组，将数组中的元素递归
          obj[key] = initalObj[key].map(item => this.deepClone(item))
        } else {
          //递归返回新的对象
          obj[key] = this.deepClone(initalObj[key]);
        }
      } else if (typeof initalObj[key] === 'function') {
        //返回新函数
        obj[key] = initalObj[key].bind(obj);
      } else {
        //基本类型直接返回
        obj[key] = initalObj[key];
      }
    }
    return obj;
  }
}
