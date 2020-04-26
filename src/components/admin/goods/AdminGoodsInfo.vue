<template>
  <div>
    <el-page-header content="商品信息" title="返回" @back="$router.push('/admin/goods/list')">
    </el-page-header>
    <el-form :model="info" :rules="goodsRules" ref="info">
      <el-row class="row-bg">
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">商品名称</div>
            <div class="div-small" v-if="flag">{{info.goodName}}</div>
            <el-form-item prop="goodName" v-else>
              <el-input v-model="info.goodName" :placeholder="info.goodName" class="div-small"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">商品类别</div>
            <div class="div-small" v-if="flag">{{info.goodType}}</div>
            <el-select placeholder="种类" v-model="info.goodType" v-else>
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.type"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">商品原价</div>
            <div class="div-small" v-if="flag">{{info.goodOriginPrice}}元</div>
            <el-form-item prop="goodOriginPrice" v-else>
              <el-input v-model="info.goodOriginPrice" :placeholder="info.goodOriginPrice"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">商品售价</div>
            <div class="div-small" v-if="flag">{{info.goodRealPrice}}元</div>
            <div v-else>
              <el-form-item prop="goodRealPrice">
                <el-input v-model="info.goodRealPrice" :placeholder="info.goodRealPrice"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">商品数量</div>
            <div class="div-small" v-if="flag">{{info.number}}</div>
            <el-form-item v-else prop="number">
              <el-input v-model="info.number" :placeholder="info.number"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">是否参加折扣</div>
            <template v-if="flag">
              <el-button v-if="info.inDiscount" size="mini" type="success">是</el-button>
              <el-button v-else size="mini" type="danger">否</el-button>
            </template>
            <el-switch
              v-else
              v-model="info.inDiscount"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col>
        <el-button @click="onChange">{{changeButton}}</el-button>
        <el-button @click="submit('info')" v-if="!flag" type="primary">提交</el-button>
        <el-button @click="deleteGoods" type="danger">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* eslint-disable */

  import axios from 'axios'
  export default {
    data () {
      var checkPrice = (rule, value, callback) => {
        const reg = /^(([1-9]\d*)|[0])(\.[0-9]{1,2})?$/
        if (!value) {
          return callback(new Error('请输入价格'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的价格'))
          } else {
            callback()
          }
        }
      }
      var checkNumber = (rule, value, callback) => {
        const reg = /^(([1-9]\d*)|[0])$/
        console.log(value)
        if(!reg.test(value))
        {
          callback(new Error('请输入正确的数量'))
        }else{
          callback()
        }
      }
      return {
        info : {
          id: 0,
          goodName: '',
          goodType: '',
          goodOriginPrice: '',
          goodRealPrice: '',
          inDiscount: false,
          number: 0,
          url: ''
        },
        typeList: [],
        flag: true,
        changeButton: '修改',
        goodsRules: {
          goodOriginPrice: [
            {validator: checkPrice, trigger: 'blur'}
          ],
          goodRealPrice: [
            {validator: checkPrice, trigger: 'blur'}
          ],
          number: [
            {validator: checkNumber, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.getGoodsInfo()
    },
    methods: {
      getAllGoodType() {
        axios.get('/api/goods/typeList')
          .then(result => {
            if(result.data.code === 200) {
              this.typeList = result.data.data
            } else {
              this.$message.error("获取商品列表失败")
            }
          })
      },
      onChange() {
        this.flag = !this.flag
        if(!this.flag) {
          this.getAllGoodType()
          this.changeButton = '放弃'
        } else {
          this.getGoodsInfo()
          this.changeButton = '修改'
        }
      },
      getGoodsInfo() {
        let id = this.$route.query.id
        axios.get('/api/goods/info',
          {
            params: {
              id : id
            }
          })
        .then(result => {
          if(result.data.code === 200) {
            this.info = result.data.data
          }
        })
      },
      deleteGoods() {
        this.$confirm('是否删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let list = []
          list.push(this.info.id)
          axios.post('/api/goods/admin/delete',list)
            .then(result => {
              if (result.data.code !== 200) {
                this.$message({
                  type: 'error',
                  message: result.data.data
                })
              } else {
                this.info.status = '删除'
                this.$message({
                  type: 'success',
                  message: '删除成功,即将跳转到商品列表'
                })
                this.$router.push('/admin/goods/admin/list')
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃删除'
          });
        });
      },
      submit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            if(!this.info.goodType || this.info.goodType === ''){
              this.$message.error('请选择商品种类')
            }else{
              let map = new Map()
              this.typeList.forEach(row => {
                map.set(row.type, row.id)
              })
              if(map.has(this.info.goodType)) {
                this.info.goodType = map.get(this.info.goodType)
              }else {
                this.$message.error('商品种类选择错误')
              }
            }
            //console.log(this.info)
            axios.post('/api/goods/admin/update',this.info)
            .then(result => {
              if(result.data.code === 200) {
                this.$notify({
                  title:'更新',
                  message: '更新成功'
                })
                this.onChange()
              }else {
                this.$message.error(this.data.message)
              }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error))
            })
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

