<template>
  <el-form :model="goods" :rules="goodsRule"  ref="mailRegister" class="demo-ruleForm" size="medium" label-position="right" label-width="100px">
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
              v-for="item in typeList"
              :key="item.id"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="goodOriginPrice" label="商品原价">
          <el-input placeholder="商品原价" v-model="goods.goodOriginPrice" style="width: 350px;" oninput ="value=value.replace(/[^\d.]/g,'')">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="goodRealPrice" label="商品售价">
          <el-input placeholder="商品售价" v-model="goods.goodRealPrice" style="width: 350px;">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="inDiscount" label="是否参加折扣">
          <el-switch
            v-model="goods.inDisCount"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item>
          <el-button type="primary" @click="show">添加商品</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        goods: {
          goodName: '',
          goodType: '',
          goodOriginPrice: '',
          goodRealPrice: '',
          inDisCount: false,
          number: 0,
          url: ''
        },
        typeList: [],
        goodsRule: {
          goodName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择商品种类', trigger: 'blur'}
          ],
          goodOriginPrice: [
            {required: true, message: '请输入商品价格', trigger: 'blur'}
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
              this.typeList = result.data.data
            } else {
              this.$message.error("获取商品列表失败")
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
