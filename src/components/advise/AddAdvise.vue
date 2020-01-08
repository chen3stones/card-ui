<template>
  <el-form ref="advise" :model="advise">
    <el-container>
      <el-aside width="150px">
        <advise-menu></advise-menu>
      </el-aside>
        <el-main>
          <el-form-item label="反馈类型">
            <el-radio v-model="advise.type" label="0">投诉</el-radio>
            <el-radio v-model="advise.type" label="1">建议</el-radio>
          </el-form-item>
          <el-form-item label="反馈对象">
            <el-input placeholder="反馈对象"></el-input>
          </el-form-item>
          <el-form-item label="反馈内容">
            <el-input placeholder="反馈内容"></el-input>
          </el-form-item>
        </el-main>
    </el-container>
  </el-form>
</template>

<script>
  import AdviseMenu from './AdviseMenu'
  export default {
    name: 'AddAdvise',
    template: "<advise-menu></advise-menu>",
    components: {
      AdviseMenu
    },

    data() {
      return {
        advise: {
          type: 1,
        }
      }
    }

  }
</script>

<style scoped>

</style>
