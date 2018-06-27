<template>
  <div id="app">
    <button @click="openMsg">open</button>
    <button @click="openMsg('warning')">Open Icon</button>
    <button @click="openMsg('manualClose')">won't close auto.</button>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      msg: null
    }
  },
  methods: {
    openMsg(str) {
      switch (str) {
        case 'warning':
          this.$msg({
            text: 'test message.',
            type: 'warning'
          })
          break
        case 'manualClose':
          if (this.msg) {
            this.msg.close()
            this.msg = null
          } else {
            this.msg = this.$msg({
              text: `I won't close automatically.click the button to close.`,
              autoClose: false
            })
          }
          break
        default:
          this.$msg('test message without icon')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
