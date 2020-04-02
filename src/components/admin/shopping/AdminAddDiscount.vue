<template>
  <el-form :model="discount" :rules="discountRules" ref="discount" size="medium" label-position="right" label-width="100px">
    <el-row>
      <el-col :span="8" :offset="5">
        <el-form-item prop="discountName" label="折扣名称">
          <el-input v-model="discount.discountName" placeholder="折扣名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item prop="type" label="折扣类型">
          <el-select v-model="discount.discountType" placeholder="折扣类型" style="width: 23em">
            <el-option label="满X件Y折" :value="1"></el-option>
            <el-option label="满X元减Y元" :value="0"></el-option>
            <el-option label="生日折扣" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item prop="amount" label="门槛">
          <el-input v-model="discount.amount">
            <template slot="prepend">满</template>
            <template slot="append" v-if="discount.discountType === 0">元</template>
            <template slot="append" v-else>件</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item prop="discount" label="折扣">
          <el-input v-model="discount.discount">
            <template slot="prepend" v-if="discount.discountType === 0">减</template>
            <template slot="prepend" v-else>打</template>
            <template slot="append" v-if="discount.discountType === 0">元</template>
            <template slot="append" v-else>折</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item prop="number" label="适用商品种类">
          <el-select placeholder="种类" v-model="discount.goodsType" style="width: 23em">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.type"
              :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-tooltip :content="discount.discountType === 2 ? '优惠有效时间为生日前后3天' : '请选择时间'">
          <el-form-item label="生效时间">
            <el-date-picker
              v-model="timeRange"
              :disabled="discount.discountType === 2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="生效日期"
              end-placeholder="截至日期"
              style="width: 23em">
            </el-date-picker>
          </el-form-item>
        </el-tooltip>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item prop="inDiscount" label="状态">
          <el-switch
            v-model="discount.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已启用"
            inactive-text="未启用">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item label="备注">
          <el-input v-model="discount.note" type="textarea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="5">
        <el-form-item>
          <el-button type="primary" @click="addDiscount('discount')">添加商品</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      //检查门槛
      var checkAmount = (rule, value, callback) => {
        let type = this.discount.discountType
        if (type === 0 || type === 1 || type === 2) {
          //打折
          if(type === 1 || type === 2) {
            if(value >= 0 && value % 1 === 0) {
              callback()
            }else {
              callback(new Error('请输入正确的件数'))
            }
          }else if(type === 0){
            if(value >= 0) {
              callback()
            } else {
              callback(new Error('请输入正确的金额'))
            }
          }
        }else {
          return callback(new Error('请先选择折扣类型'))
        }
      }
      var checkDiscount = (rule, value, callback) => {
        let type = this.discount.discountType
        if(type === 0 || type === 1 || type === 2) {
          //打折
          if(type === 1 || type === 2) {
            if(value > 0 && value < 10) {
              callback()
            }else {
              callback(new Error('请输入正确的折扣'))
            }
          }else{
            if(value > 0) {
              callback()
            }else {
              callback(new Error('请输入正确的折扣'))
            }
          }
        }else{
          return callback(new Error('请先选择折扣类型'))
        }

      }
      return {
        discount: {
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
        timeRange: [],
        discountRules: {
          discountName: [
            {required: true, message: '请输入折扣名称', trigger: 'blur'},
          ],
          amount: [
            {required: true, message: '请输入折扣门槛', trigger: 'blur'},
            {validator: checkAmount, trigger: 'blur'}
          ],
          discount: [
            {required: true, message: '请输入折扣', trigger: 'blur'},
            {validator: checkDiscount, trigger: 'blur'}
          ]
        }
      }
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
      show() {
        console.log(this.typeList)
      },
      addDiscount: function (formName) {
        console.log(this.discount)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.discount.goodType || this.discount.goodType === ''){
              this.$message.error('请选择商品种类')
              return
            }
            if(this.discount.discountType !== 2) {
              if( this.timeRange.length !== 2) {
                this.$message.error('请选择折扣生效时间')
                return
              } else {
                let timeList = this.timeRange
                this.discount.stime = Date.parse(timeList[0])
                this.discount.etime = Date.parse(timeList[1])
              }
            }
            axios.post('/api/shopping/discount/add', this.discount)
              .then(result => {
                if (result.data.code === 200) {
                  this.$notify({
                    title: '添加',
                    message: ('hi', { style: 'color: teal'}, '添加成功')
                  });
                } else {
                  this.$message.error(result.data.message)
                }
              })
              .catch(function (error) {
                console.log(JSON.stringify(error))
              })
          }
        })
      }
    },
    created () {
      this.getAllDiscountType()
    }
  }
</script>

<style scoped>

</style>
