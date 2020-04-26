<template>
  <el-form :model="goods" :rules="goodsRules"  ref="goods" size="medium" label-position="right" label-width="100px">
    <el-row>
      <el-col>
        <el-form-item prop="goodName" label="商品名称">
          <el-input v-model="goods.goodName" placeholder="商品名称" style="width: 350px"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="type" label="商品类型">
          <el-select v-model="goods.goodType" placeholder="商品类型" style="width: 350px">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="goodOriginPrice" label="商品原价">
          <el-tooltip content="精确到小数点后两位">
            <el-input placeholder="商品原价" v-model="goods.goodOriginPrice" style="width: 350px;">
              <template slot="append">元</template>
            </el-input>
          </el-tooltip>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="goodRealPrice" label="商品售价">
          <el-tooltip content="精确到小数点后两位">
            <el-input placeholder="商品售价" v-model="goods.goodRealPrice" style="width: 350px;">
              <template slot="append">元</template>
            </el-input>
          </el-tooltip>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="number" label="数量">
          <el-input placeholder="商品数量" v-model="goods.number" style="width: 350px;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="inDiscount" label="是否参加折扣">
          <el-switch
            v-model="goods.inDiscount"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item>
          <el-button type="primary" @click="addGoods('goods')">添加商品</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
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
        goods: {
          goodName: '',
          goodType: '',
          goodOriginPrice: '',
          goodRealPrice: '',
          inDiscount: false,
          number: '',
          url: ''
        },
        typeList: [],
        goodsRules: {
          goodName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
          ],
          // type: [
          //   {required: true, message: '请选择商品种类', trigger: 'blur'}
          // ],
          goodOriginPrice: [
            {required: true, message: '请输入商品价格', trigger: 'blur'},
            {validator: checkPrice, trigger: 'blur'}
          ],
          goodRealPrice: [
            {required: true, message: '请输入商品价格', trigger: 'blur'},
            {validator: checkPrice, trigger: 'blur'}
          ],
          number: [
            {required: true, message: '请输入商品数量', trigger: 'blur'},
            {validator: checkNumber, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      show() {
        console.log(this.typeList)
      },
      getAllGoodType() {
        axios.get('/api/goods/typeList')
          .then(result => {
            if(result.data.code === 200) {
              console.log(result.data.data)
              this.typeList = result.data.data
            } else {
              this.$message.error("获取商品列表失败")
            }
          })
      },
      addGoods: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(!this.goods.goodType || this.goods.goodType === ''){
              this.$message.error('请选择商品种类')
              return
            }
            axios.post('/api/goods/admin/add', this.goods)
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
      this.getAllGoodType()
    }
  }
</script>

<style scoped>

</style>
