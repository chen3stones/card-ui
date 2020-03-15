<template>
  <el-tree :data="data"
           :props="defaultProps"
           :highlight-current="true"
           ref="tree"
           accordion
           show-checkbox
           check-strictly="true"
           node-key="id"
           @node-click="handleNodeClick"
           @check-change="checkChange">
  </el-tree>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'adviseMenu',
    data () {
      return {
        data: [],
        editCheckId: 0,
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
        if (node === true) {
          this.editCheckId=item.id;
          this.$refs.tree.setCheckedKeys([item.id])
        }else {
          if (this.editCheckId === item.id) {
            this.$refs.tree.setCheckedKeys([item.id])
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>
