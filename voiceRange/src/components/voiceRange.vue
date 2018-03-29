<template>
  <div class="voice-range">
    <span class="title">音量:</span>
    <div class="range-wrap">
      <input type="range"
             v-model="rangeNum"
             :max="rangeMax">
      <canvas id="range" ref="range" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <span class="result">{{rangeNum}}</span>
  </div>
</template>

<script>

  export default {
    name: "voicerange",
    data() {
      return {
        ctx: '',
        rangeNum: 60,
      }
    },
    props: {
      rangeMax: {
        type: Number,
        default() {
          return 150
        }
      },
      canvasHeight: {
        type: Number,
        default: () => 20
      },
      canvasWidth: {
        type: Number,
        default: () => 300
      }
    },
    watch: {
      rangeNum(newNum) {
        console.log(newNum)
        this.drawCanvas(newNum)
        this.$emit('rangeChange', this.rangeNum)
      }
    },
    methods: {
      initRange() {

      },
      drawCanvas(num) {
        let range = this.$refs.range
        let ctx = range.getContext('2d')
        this.ctx = ctx
        // draw background.
        const WIDTH = 300
        const PERSENT100 = 100 / this.rangeMax
        ctx.beginPath()
        ctx.moveTo(2, 2)
        ctx.lineTo(2, 18)
        ctx.strokeStyle = '#60a1f5'
        ctx.stroke()
        ctx.moveTo(2, 20)
        ctx.lineTo(WIDTH - 2, 20)
        ctx.moveTo(WIDTH - 2, 18)
        ctx.lineTo(WIDTH - 2, 2)
        ctx.strokeStyle = 'rgb(216, 216, 216)'
        ctx.stroke()

        ctx.moveTo(WIDTH / 2, 2)
        ctx.lineTo(WIDTH / 2, 18)
        ctx.strokeStyle = '#99bae9'
        ctx.stroke()

        ctx.moveTo(4,18)
        ctx.lineTo(WIDTH - 4, 18)
        ctx.lineTo(WIDTH - 4,2)
        ctx.fillStyle = "rgb(216, 216, 216)";
        ctx.fill()
        ctx.closePath()
        ctx.save()
        const NUM_MAX = this.rangeMax
        let scale = num / NUM_MAX
        let height = 18 - (18 * scale - 2)

        let width = WIDTH * scale
        ctx.restore()
        // ctx.restore()
        if (num < 100) {
          ctx.beginPath()
          ctx.moveTo(2, 18)
          ctx.lineTo(width, 18)
          ctx.lineTo(width, height)
          ctx.fillStyle = '#99bae7'
          ctx.fill()
        } else if (num >= 100 ) {
          let H100 = 18 - (18 * 100 / WIDTH - 2)
          let W100 = 100 / NUM_MAX * WIDTH
          ctx.beginPath()
          ctx.moveTo(W100, 18)
          ctx.lineTo(W100, H100)
          ctx.lineTo(width, height)
          ctx.lineTo(width, 18)
          ctx.lineTo(W100, 18)
          ctx.fillStyle = '#f7c700'
          ctx.fill()
        }
        console.log('num changed', num, height, width)
      }
    },
    created() {
      this.$nextTick(() => {
        this.initRange()
        this.drawCanvas(this.rangeNum)
      })
    }
  }
</script>

<style scoped lang="less">
  .voice-range {
    display: flex;
    justify-content: space-between;
    .title {
      // flex-grow: 1;
      width: 100px;
    }
    .range-wrap {
      width: 300px;
      position: relative;
    }
    input[type=range] {
      -webkit-appearance: none;
      width: 96%;
      display: block;
      position: relative;
      margin: 0 auto;
      z-index: 10;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 24px;
      width: 12px;
      background: url("../assets/icon_yinliang.png") center no-repeat;
    }
    #range {
      width: 100%;
      height: 20px;
      position: absolute;
      top: 2px;
      left: 0;
    }
    .result {
      border: 1px solid rgb(211, 212, 216);
      margin-left: 10px;
      border-radius: 4px;
      width: 40px;
      text-align: center;
    }
  }
</style>