
<script>
  import axios from 'axios'
  export default {
    name: 'Logout',
    methods: {
      logout: function () {
        axios.get('/api/logout')
        .then(result => {
          console.log(result)
        })
      }
    },
    created () {
      this.logout()
    }
  }
</script>

<style scoped>

</style>
