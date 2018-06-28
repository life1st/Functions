import loading from './loading.vue'

let loadingPlugin = {}

loadingPlugin.install = function (Vue, options = {}) {
  const loadingController = Vue.extend(loading)

  loadingController.prototype.close = function () {
    this.showLoading = false
    setTimeout(() => {
      this.$el.remove()
    }, 500)
  }

  Vue.prototype.$loading = (option = {}) => {
    let instance = new loadingController().$mount(document.createElement('div'))
    if (typeof option === 'string') {
      instance.desc = option
    } else {
      for (let k in option) {
        instance[k] = option[k]
      }
    }
    document.body.appendChild(instance.$el)

    return instance
  }
}

export default loadingPlugin
