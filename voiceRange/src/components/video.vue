<template>
  <div class="video-wrap">
      <div class="video-list" ref="videos">
          <video :src="video.src" v-for="(video, k) in videos" :key="k"></video>
      </div>
      <div class="control-btns">
          <button class="play">{{isPlaying ? "pause" : "play" }}</button>
      </div>
      <div class="status">
        <div class="time">
          <p v-for="(time, k) in times" :key="k">{{k}} : {{time}}</p>
        </div>
      </div>
  </div>
</template>
<style lang="less" scoped>

</style>
<script>
export default {
  name: 'vVideo',
  data() {
    return {
      videos: [
        {
          src: '../assets/videos/demo1.mkv',
          title: 'Demo1'
        },
        {
          src: '../assets/videos/demo2.mkv',
          title: 'Demo2'
        }
      ],
      times: [],
      isPlaying: false
    }
  },
  methods: {
    play() {
      let videos = this.$refs.videos
      videos.forEach(video => {
        video.play()
      })
    }
  }
}
</script>
