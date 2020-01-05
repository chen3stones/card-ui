import UserIndex from './UserIndex'
const userMenu = {
  install: function (Vue) {
    Vue.component('user-menu', UserIndex)
  }
}

export default userMenu
