import UserIndex from '../userIndex/UserIndex'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('user-menu',UserIndex)
}

export default plugin
