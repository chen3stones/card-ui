<template>
    <el-form :data = info
    >
      <el-form-item label="标题"></el-form-item>
      <el-form-item label="时间"></el-form-item>
      <el-form-item label="内容"></el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "MessageInfo",
    data() {
      return{
        info: {}
      }
    },
    created(){
      this.info = this.$route.query.info
    }
  }
</script>

<style scoped>

</style>
