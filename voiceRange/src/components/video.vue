<template>
  <div class="video-wrap">
    <div class="video-list" ref="videos">
      <div class="video-item" v-for="(video, k) in videos" :key="k">
        <video :src="video.src" preload></video>
        <div>
          <p class="current-time">已播放：{{video.duration}} s</p>
          <p class="buffered">缓冲长度： {{video.buffered}} s</p>
          <p class="isPause">是否暂停： {{video.isPause ? '已暂停' : '在播放'}}</p>
        </div>
      </div>
    </div>
    <div class="control-btns">
      <button class="play" @click="play">{{isPlaying ? "pause" : "play" }}</button>
    </div>
    <div class="status">
      <div class="time">
        <p v-for="(time, k) in times" :key="k">视频{{k}}开始播放时间 : {{time}} s</p>
        <p class="now">时间轴总经过时间：{{timeLine.now}} S</p>
        <p class="buffered">最短 buffered 时间： {{minBuffered}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .video-list {
    display: flex;
    justify-content: space-around;
  }
  video {
    width: 300px;
    height: 200px;
  }
</style>
<script>
  export default {
    name: 'vVideo',
    data() {
      return {
        videos: [
          {
            src: 'http://192.168.189.1:8000/videos/demo1.mkv',
            title: 'Demo1',
            startAt: 20,        //sec
            duration: null,
            buffered: null,
            isPause: null
          },
          {
            src: 'http://192.168.189.1:8000/videos/demo2.mkv',
            title: 'Demo2',
            startAt: 5,
            duration: null,
            buffered: null,
            isPause: null
          }
        ],
        timeLine: {
          start: 0,
          now: 0,
        },
        times: [],
        isPlaying: false
      }
    },
    computed: {
      timeNow() {
        return this.timeLine.now
      },
      minBuffered() {
        let arr = []
        this.videos.forEach(video => {
          arr.push(video.buffered)
        })
        console.log('arr:::>>>', arr)
        return Math.min(...arr)
      }
    },
    watch: {
      timeNow: function(now) {
        console.log(now)
      },
      // minBuffered: function(buffered) {
      //   if (this.timeLine.now >= this.videos[i].startAt) {
      //     if (buffered < 10) {
      //       this.pauseAll()
      //     } else {
      //       this.rePlayAll()
      //     }
      //   }
      // }
    },
    methods: {
      // pauseAll() {
      //   let videos = this.$refs.videos.querySelectorAll('video')
      //   videos.forEach(video => {
      //     video.pause()
      //   })
      //   this.isPlaying = false
      // },
      // rePlayAll() {
      //   let videos = this.$refs.videos.querySelectorAll('video')
      //   videos.forEach((video, i) => {
      //     if (this.timeLine.now >= this.videos[i].startAt) {
      //       video.play()
      //     } else {
      //       return
      //     }
      //   })
      //   this.isPlaying = true
      // },
      play() {
        let videos = this.$refs.videos.querySelectorAll('video')
        videos.forEach((video, i) => {
          if (this.isPlaying) {
            video.pause()
          } else {
            if (this.timeLine.now >= this.videos[i].startAt) {
              video.play()
            }
          }
        })
        this.isPlaying = !this.isPlaying
      },
      timePlus() {
        const HAVE_NOTHING = 0
        const HAVE_MATADATA = 1
        const HAVA_CURRENT_DATA = 2
        let i = 0
        let videos = this.$refs.videos.querySelectorAll('video')
        this.interval = setInterval(() => {
          videos.forEach((video, i) => {
            let currentTime = video.currentTime
            let buffered = video.buffered.end(0)
            let isPause = video.paused
            this.videos[i].duration = Math.floor(currentTime)
            this.videos[i].buffered = buffered
            this.videos[i].isPause = isPause
          })
          if (this.isPlaying) {
            this.timeLine.now ++
            this.times.forEach((time, i) => {
              if (this.timeLine.now === time) {
                videos[i].play()
              }
            })
          }
        }, 1000)
      },
      initTimeLine() {
        this.videos.sort((a, b) => a.startAt - b.startAt)
        this.videos.forEach(video => {
          this.times.push(video.startAt)
        })
      },
      initEvent() {
        let video = document.querySelector('video')
        video.addEventListener('progress', (e) => {
          console.log('Progress event handle:>>>', e)
        })
      }
    },
    created() {
      window.refs = this.$refs
      this.initTimeLine()
      this.$nextTick(() => {
        this.timePlus()
        this.initEvent()
      })
    }
  }
</script>
