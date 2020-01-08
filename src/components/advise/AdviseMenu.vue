<template>
  <el-tree :data="data"
           :props="defaultProps"
           ref="tree"
           highlight-current
           show-checkbox
           check-strictly="true"
           node-key="id"
           @node-click="handleNodeClick"
           @checl-change="checkChange"
  class="el-tree-node">
  </el-tree>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'adviseMenu',
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    created () {
      this.getAdviseMenu()
    },
    methods: {
      getAdviseMenu: function () {
        axios.get('/api/advise/menu')
          .then(response => {
            if (response.data.code === 200) {
              this.data = response.data.data
              console.log(this.data)
            } else {
              this.$message(response.data.message)
            }
          })
          .catch(error => {
            this.$message(error)
          })
      },
      handleNodeClick(item,node,self){ //自己定义的editCheckId，防止单选出现混乱
        this.editCheckId=item.id;
        this.$refs.tree.setCheckedKeys([item.id])
      },
      checkChange(item,node,self){
        if (node == true) {
          this.editCheckId=item.id;
          this.$refs.tree.setCheckedKeys([item.id])
        }else {
          if (this.editCheckId == item.id) {
            this.$refs.tree.setCheckedKeys([item.id])
          }
        }
      }
    }
  }
</script>

<style scoped>
  .el-tree-node{
    .is-leaf + .el-checkbox .el-checkbox__inner{
      display: inline-block;
    }
    .el-checkbox .el-checkbox__inner{
      display: none;
    }
  }
</style>
