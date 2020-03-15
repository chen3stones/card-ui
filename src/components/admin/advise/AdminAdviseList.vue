<template>
  <div>
  <el-table :data="tableData" :row-class-name="tableRowColor">
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
    <el-table-column label="投诉id" prop="id"></el-table-column>
    <el-table-column label="投诉对象" prop="beAdviseName"></el-table-column>
    <el-table-column label="投诉/建议" prop="type"></el-table-column>
    <el-table-column label="投诉类别" prop="adviseMenu"></el-table-column>
    <el-table-column label="投诉时间" prop="adviseTime"></el-table-column>
  </el-table>
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
        tableData: [],
        shown: false
      }
    },
    created () {
      this.getAdviseList()
    },
    methods: {
      getAdviseList() {
        axios.get('/api/advise/admin/list')
          .then(response => {
            this.tableData = response.data.data
          })
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
            row.a = data.replyUserName
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
