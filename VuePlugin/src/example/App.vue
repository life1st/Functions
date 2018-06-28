<template>
  <div id="app">
    <div class="nav">
      <router-link to="/message">message</router-link>
      <router-link to="/loading">loading</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  a {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
