<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">商品名称</div>
          <div class="div-small" v-if="flag">{{info.goodName}}</div>
          <el-input v-model="info.goodName" :placeholder="info.goodName" v-if="!flag"></el-input>
        </div>
      </el-col>
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">商品类别</div>
          <div class="div-small" v-if="flag">{{info.goodType}}</div>
          <el-select placeholder="种类" v-model="info.goodType" v-if="!flag">

          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">商品原价</div>
          <div class="div-small" v-if="flag">{{info.goodOriginPrice/100}}元</div>
        </div>
      </el-col>
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">商品售价</div>
          <div class="div-small" v-if="flag">{{info.goodRealPrice/100}}元</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">商品数量</div>
          <div class="div-small">{{info.number}}</div>
        </div>
      </el-col>
      <el-col :span="8" offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">是否参加折扣</div>
          <div class="div-small">{{info.inDiscount}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="onClick">修改</el-button>
        <el-button @click="change" v-if="!flag">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* eslint-disable */

  import axios from 'axios'
  export default {
    data () {
      return {
        info : {
          goodName: '',
          goodType: '',
          goodOriginPrice: '',
          goodRealPrice: '',
          inDiscount: false,
          number: 0,
          url: ''
        },
        flag: true
      }
    },
    created () {
      this.getGoodsInfo()
    },
    methods: {

      getGoodsInfo() {
        let id = this.$route.query.id
        axios.get('/api/goods/info',
          {
            params: {
              id : id
            }
          })
        .then(result => {
          console.log(result)
          if(result.data.code === 200) {
            this.info = result.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .div-box {
    padding: 10px;
  }
  .div-small {
    margin: 5px;
  }
</style>

