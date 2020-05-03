<template>
  <div>
    <el-table :data="pagination.tableData" :row-class-name="tableRowColor">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form inline>
            <el-form-item label="被投诉人" class="label">
              <span>{{props.row.beAdviseName}}</span>
            </el-form-item>
            <el-form-item label="投诉类别" class="label">
              <span>{{props.row.adviseMenu}}</span>
            </el-form-item>
            <el-form-item label="投诉时间" class="label">
              <span>{{props.row.adviseTime}}</span>
            </el-form-item>
            <el-form-item label="投诉内容" class="label">
              <span>{{props.row.adviseInfo}}</span>
            </el-form-item>
            <div v-if="props.row.replyUserName !== ''">
              <el-form-item label="回复人" class="re-label">
                <span>{{props.row.replyUserName}}</span>
              </el-form-item>
              <el-form-item label="回复时间" class="re-label">
                <span>{{props.row.replyTime}}</span>
              </el-form-item>
              <el-form-item label="回复内容" class="big-re-label">
                <span>{{props.row.replyInfo}}</span>
              </el-form-item>
            </div>
            <div v-if="props.row.replyUserName === ''">
              <el-input type = "textarea" v-model="advise.text" clearable></el-input>
              <el-button @click="submit(props.row.id,props.$index)">提交</el-button>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="投诉id" prop="id" align="center"></el-table-column>
      <el-table-column label="投诉对象" prop="beAdviseName" align="center"></el-table-column>
      <el-table-column label="投诉/建议" prop="type" align="center"></el-table-column>
      <el-table-column label="投诉类别" prop="adviseMenu" align="center"></el-table-column>
      <el-table-column label="投诉时间" prop="adviseTime" align="center"></el-table-column>
      <el-table-column label="回复状态" prop="replyUserName" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.replyUserName === ''" type="danger" size="mini">未回复</el-button>
          <el-button v-else type="success" size="mini">已回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :hide-on-single-page = "hidePage"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AdviseList',
    data () {
      return {
        advise: {
          id: 0,
          text: ''
        },
        pagination: {
          pageSize: 10,
          currentPage: 1,
          tableData: []
        },
        hidePage: true,
        shown: false
      }
    },
    created() {
      this.getAdviseList()
      this.pagination.currentPage = Number(localStorage.getItem('adminAdvisePage')) || 1
    },
    beforeDestroy (){
      localStorage.setItem('adminAdvisePage',this.pagination.currentPage)
    },
    methods: {
      getAdviseList() {
        axios.get('/api/advise/admin/list',{
          params: {pageSize: this.pagination.pageSize,currentPage: this.pagination.currentPage}
        }).then(response => {
          if (response.data.code === 200) {
            this.pagination = response.data.data
            console.log(this.pagination)
            if(this.pagination.pageSize < this.pagination.total) {
              this.hidePage = false
            }
          } else {
            this.$message(response.data.message)
          }
          })
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val
        this.getAdviseList()
      },
      changeShow() {
        this.shown = !this.shown
      },
      submit(id, index) {
        this.advise.id = id
        axios.post('/api/advise/admin/reply',this.advise)
        .then(result => {
          if(result.data.code === 200) {
            this.$message({
              type: 'success',
              message: '已成功回复'
            })
            let row = this.tableData[index]
            let data = result.data.data
            row.replyUserName = data.replyUserName
            row.replyTime = data.replyTime
            row.replyInfo = data.replyInfo
          }
        })
      },
      tableRowColor({row, rowIndex}) {
        if (row.replyInfo !== '') {
          return 'already-processed'
        }else {
          return 'not-processed'
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  .label {
    width: 190px;
    color: #409EFF;
  }
  .not-processed {
    background: #42b983;
  }
  .re-label {
    width: 190px;
    color: #42b983;
  }
  .big-re-label {
    width: 360px;
    color: #42b983;
  }
  .el-table .already-processed {
    background: #f0f9eb;
  }
</style>
