<template>
  <transition name="fade">
    <div class="message" v-show="showMsg">
      <p><i class="icon" :class="msgType"></i>{{text}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "message",
    props: {
      type: {
        type: String,
        default: () => 'default'
      },
      text: {
        type: String,
        default: () => 'success'
      }
    },
    computed: {
      msgType() {
        let types = ['default', 'success', 'info', 'warning', 'error']
        return (types.includes(this.type)) ? this.type : types[0]
      }
    },
    data() {
      return {
        showMsg: false
      }
    },
    mounted() {
      this.showMsg = true
    }
  }
</script>

<style scoped lang="less">
  .message {
    position: fixed;
    bottom: 40%;
    left: 50%;
    width: 65%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    padding: 12px 8px;
    color: #FFF;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    .icon {
      display: inline-block;
      width: 16px;
      height: 20px;
      margin-right: 4px;
      vertical-align: top;
    }
    .success {
      // todo
    }
    .info {
      // todo
    }
    .warning {
      background: url("ic_attention.png") center no-repeat;
    }
    .error {

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
    transition: opacity 200ms linear;
  }
</style>