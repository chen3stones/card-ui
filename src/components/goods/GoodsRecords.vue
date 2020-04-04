<template>
  <el-container>
    <el-header><el-page-header content="订单信息" title="返回" @back="$router.push(back)">
    </el-page-header></el-header>
    <el-main>
      <div>
        <el-table :data="goodRecords" :header-cell-style="rowClass" :cell-style="rowClass">
          <el-table-column prop="id" label="商品Id"></el-table-column>
          <el-table-column prop="goodName" label="商品名称"></el-table-column>
          <el-table-column prop="num" label="商品数量"></el-table-column>
          <el-table-column label="商品价格">
            <template slot-scope="scope">
              <span>{{scope.row.originMoney/100}}元</span>
            </template>
          </el-table-column>
          <el-table-column label="支付金额">
            <template slot-scope="scope">
              <span>{{scope.row.realMoney/100}}元</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="shoppingRecordView.discountList.length > 0">
        <br><br>
        <strong>折扣信息</strong>
        <el-table align="right" :data="shoppingRecordView.discountList">
          <el-table-column property="discountName" label="折扣名称" align="center">
            <template slot-scope="scope" slot="header">
              <span>折扣名称</span>
              <el-tooltip effect="dark" content="以下顺序即为计算时的顺序" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="详情" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.discountType === 0">满{{scope.row.amount/100}}元减{{scope.row.discount/100}}元</div>
              <div v-else>满{{scope.row.amount}}件{{scope.row.discount}}折</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="8" :offset="8">
          <div>原价:{{shoppingRecordView.totalMoney/100}}元</div>
        </el-col>
        <el-col :span="8">
          <div>支付价格:{{shoppingRecordView.realMoney/100}}元</div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'GoodsRecords',
    data() {
      return {
        goodRecords: [],
        back: '',
        shoppingRecordView: {
          buyer: 0,
          seller: 0,
          goodsList: [],
          discountList: [],
          totalMoney: 0.0,
          realMoney: 0.0
        }
      }
    },
    created () {
      this.getGoodsRecords()
    },
    methods: {
      getGoodsRecords: function () {
        let url = ''
        if(this.$route.path === '/admin/goods/records'){
          this.back = '/admin/purchase/list'
          url = '/api/goods/admin/records'
        }else{
          this.back = '/purchase/list'
          url = '/api/goods/records'
        }
        let id = this.$route.params.id
        axios.get(url,
          {params: {'id':this.$route.query.id}})
        .then(response => {
          this.goodRecords = response.data.data
        })
        axios.get("/api/goods/purchase/search",
          {params: {'id' : this.$route.query.id}})
        .then(response => {
          this.shoppingRecordView = response.data.data
        })
      },
      headClass: function () {
        return 'text-align: center;background:#eef1f6;'
      },
      rowClass: function () {
        return 'text-align: center;'
      }
    }
  }
</script>

<style scoped>
</style>
