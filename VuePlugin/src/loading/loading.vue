<template>
  <transition name="fade">
    <div class="loading" v-show="showLoading">
      <i class="icon"></i>
      <p class="desc">{{desc}}<span class="substr">{{subStr}}</span></p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "loading",
    props: {
      Desc: {
        type: String,
      }
    },
    data() {
      return {
        desc: 'loading',
        subStr: '',
        showLoading: false
      }
    },
    watch: {
      showLoading(flag) {
        if (flag) {
          this.subPoint()
        } else if (this.timer) {
          clearInterval(this.timer)
        }
      }
    },
    methods: {
      subPoint() {
        let points = ['.', '..', '...']
        let i = 0
        this.timer = setInterval(() => {
          this.subStr = points[i++ % points.length]
        }, 500)
      }
    },
    mounted() {
      this.showLoading = true
      if (this.Desc) this.desc = this.Desc
    }
  }
</script>

<style scoped lang="less">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      width: 34px;
      height: 34px;
      background: url("ic_loading.png") center no-repeat;
      animation: 1.4s rotateCycle linear infinite;
    }
    .desc {
      position: relative;
      color: #FFF;
      font-size: 18px;
      margin-top: 10px;
    }
    .substr {
      left: 105%;
      position: absolute;
    }
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s;
  }
  @keyframes rotateCycle {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>