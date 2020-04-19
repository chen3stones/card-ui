<template>
  <div class="hello">
    <div id="chart1"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
      }
    },
    mounted() {
      this.$chart.line('chart1');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chart1 {
    width: 300px;
    height: 300px;
  }
</style>
