import message from './message'

let msgPlugin = {}

msgPlugin.install = function (Vue, options = {}) {
  const messageControler = Vue.extend(message)

  messageControler.prototype.close = function () {
    this.showMsg = false
    this.$el.addEventListener('transitionend', () => {
      this.$el.remove()
    })
  }

  Vue.prototype.$msg = (option = {}) => {
    let instance = new messageControler().$mount(document.createElement('div'))
    let duration = option.duration || options.duration || 2500
    if (typeof option === 'string' ) {
      instance.text = option
    } else {
      for (let k in option) {
        instance[k] = option[k]
      }
    }
    document.body.appendChild(instance.$el)

    if (!instance.autoClose && instance.autoClose !== undefined) {
      return instance
    } else {
      setTimeout(() => {
        instance.close()
      }, duration)
    }
  }
}

export default msgPlugin