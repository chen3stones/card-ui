<template>
  <div>
    <el-table :data="tableData">
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
              <el-form-item label="回复内容" class="re-label">
                <span>{{props.row.replyInfo}}</span>
              </el-form-item>
              <el-form-item label="回复内容" class="re-label">
                <span>{{props.row.adviseInfo}}</span>
              </el-form-item>
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
        tableData: []
      }
    },
    created () {
      this.getAdviseList()

    },
    methods: {
      getAdviseList: function () {
        axios.get('/api/advise/user/list')
          .then(response => {
            console.log(response)
             this.tableData = response.data.data
          })
      }
    }
  }
</script>

<style scoped>
  .label {
    width: 190px;
    color: #409EFF;
  }
  .time-label {
    width: 300px;
  }
  .re-label {
    width: 190px;
    color: #42b983;
  }
</style>
