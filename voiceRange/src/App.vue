<template>
  <div id="app">
     <voice-range></voice-range>
    <!--<v-video></v-video>-->
  </div>
</template>

<script>
import voiceRange from "./components/voiceRange"
import vVideo from "./components/video"

export default {
  name: 'app',
  components: {
    voiceRange, 
    vVideo
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
