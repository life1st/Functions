<template>
  <div class="loading-index">
    <button @click="showLoading">showLoading</button>
  </div>
</template>

<script>
export default {
  name: 'LoadingIndex',
  methods: {
    showLoading () {
      this.loading = this.$loading('loading desc')
      setTimeout(() => {
        this.closeLoading()
      }, 2000)
    },
    closeLoading () {
      if (this.loading) {
        this.loading.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
