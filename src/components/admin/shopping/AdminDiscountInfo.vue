<template>
  <div>
    <div class="crumbs">
      <el-page-header content="折扣信息" title="返回" @back="$router.push('/admin/discount/list')">
      </el-page-header>
    </div>
    <el-form :model="info" :rules="goodsRules" ref="info">
      <el-row class="row-bg">
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">折扣方案名称</div>
            <div class="div-small" v-if="flag">{{info.discountName}}</div>
            <el-form-item prop="discountName" v-else>
              <el-input v-model="info.discountName" :placeholder="info.discountName" class="div-small"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">折扣类别</div>
            <div class="div-small">{{discountTypeEnum[info.discountType]}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">适用商品类别</div>
            <div class="div-small" v-if="flag">{{info.goodsType}}</div>
            <el-select placeholder="种类" v-model="info.goodsType" v-else>
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.type"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">折扣详情</div>
            <div class="div-small" v-if="flag">
              <div v-if="info.discountType === 0">满{{info.amount}}元减{{info.discount}}元</div>
              <div v-else>满{{info.amount}}件{{info.discount}}折</div>
            </div>
            <div v-else>
              <el-row>
                <el-col :span="2"><div>满</div></el-col>
                <el-col :span="6">
                  <el-form-item prop="amount">
                    <el-input v-model="info.amount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <div v-if="info.discountType===1 || info.discountType === 2">件，打</div>
                  <div v-else>元，减</div>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="discountType">
                    <el-input v-model="info.discount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <div v-if="info.discountType===1 || info.discountType === 2">折</div>
                  <div v-else>元</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">状态</div>
            <template v-if="flag">
              <el-button v-if="info.status" size="mini" type="success">已启用</el-button>
              <el-button v-else size="mini" type="danger">未启用</el-button>
            </template>
            <el-switch
              v-else
              v-model="info.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="已启用"
              inactive-text="未启用">
            </el-switch>
          </div>
        </el-col>
        <el-col :span="8" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">备注</div>
            <div v-if="flag">{{info.note}}</div>
            <el-form-item prop="discountName" v-else>
              <el-input v-model="info.note" :placeholder="info.discountName" class="div-small"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="19" :offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">有效时间</div>
            <div class="div-small" v-if="flag">
              <div>{{info.stime}}  --  {{info.etime}}</div>
            </div>
            <el-form-item v-else>
              <el-tooltip :content="info.discountType === 2 ? '优惠有效时间为生日前后3天' : '请选择时间'">
                <el-date-picker
                  v-model="timeRange"
                  :disabled="info.discountType === 2"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="生效日期"
                  end-placeholder="截至日期">
                </el-date-picker>
              </el-tooltip>
            </el-form-item>
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
        if(!value) {
          callback(new Error('请输入数量'))
        }else {
          if(!reg.test(value))
          {
            callback(new Error('请输入正确的数量'))
          }else{
            callback()
          }
        }
      }
      return {
        info : {
          id: 0,
          discountName: '',
          discountType: 0,
          amount: 0,
          discount: 0,
          goodsType: '',
          stime: '',
          etime: '',
          status: 0,
          note: ''
        },
        typeList: [],
        flag: true,
        discountTypeEnum: {
          0 : '满减',
          1 : '满折',
          2 : '生日折扣'
        },
        changeButton: '修改',
        timeRange: [],
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
      this.getDiscountInfo()
    },
    methods: {
      getAllDiscountType() {
        axios.get('/api/goods/typeList')
          .then(result => {
            if(result.data.code === 200) {
              this.typeList = result.data.data
              this.typeList.reverse()
              let all = {'id': 0,
                          'type': '全品类'}
              this.typeList.push(all)
              this.typeList.reverse()
            } else {
              this.$message.error("获取商品列表失败")
            }
          })
      },
      onChange() {
        this.flag = !this.flag
        if(!this.flag) {
          this.getAllDiscountType()
          this.changeButton = '放弃'
          this.timeRange.push(new Date(this.info.stime))
          this.timeRange.push(new Date(this.info.etime))
        } else {
          this.getDiscountInfo()
          this.changeButton = '修改'
        }
      },
      getDiscountInfo() {
        let id = this.$route.query.id
        axios.get('/api/shopping/discount/info',
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
        this.$confirm('是否删除该方案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let list = []
          list.push(this.info.id)
          axios.post('/api/shopping/discount/delete',list)
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
                  message: '删除成功,即将跳转到折扣列表'
                })
                this.$router.push('/admin/discount/list')
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
          if(this.info.discountType !== 2) {
            if( this.timeRange.length !== 2) {
              this.$message.error('请选择折扣生效时间')
              return
            } else {
              let timeList = this.timeRange
              this.info.stime = Date.parse(timeList[0])
              this.info.etime = Date.parse(timeList[1])
            }
          }
          axios.post('/api/shopping/discount/update',this.info)
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

