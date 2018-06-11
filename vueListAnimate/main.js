const TEXTS = ['Aute est aliquip excepteur qui amet sit irure.',
  'Adipisicing laborum est in consectetur deserunt ullamco sit ex adipisicing veniam id.',
  'Dolor ex labore nulla qui.',
  'Enim dolor dolor ad adipisicing ullamco dolore est laboris fugiat excepteur ullamco anim.',
  'Eu eu dolore adipisicing cillum ad pariatur sit tempor commodo laboris eu cillum sit deserunt.']
const TEXTS_LEN = TEXTS.length

let dataTpl = (index) => {
  return {
    time: Math.floor(Math.random() * 1000000000000),
    text: TEXTS[index % TEXTS_LEN],
    name: 'Yang'
  }
}

let root = new Vue({
  el: '.root',
  data() {
    return {
      name: 'life1st',
      items: [

      ]
    }
  },
  filters: {
    filterTime(value) {
      console.log(value)
      let now = new Date(value)
      return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDay()}`
    }
  },
  created() {
    const DATA_LENGTH = 6

    for (let i = 0; i < DATA_LENGTH; i++) {
      this.push(i)
    }
  },
  methods: {
    shift() {
      this.items.shift()
    },
    pop() {
      this.items.pop()
    },
    push(i) {
      i ? i = Math.floor(Math.random() * 32) : ''
      this.items.push(dataTpl(i))
    },
    unshift(i) {
      i ? i = Math.floor(Math.random() * 32) : ''
      this.items.unshift(dataTpl(i))
    },
    removeRandom() {
      const LEN = this.items.length
      let i = Math.floor(Math.random() * LEN)
      this.items.splice(i, 1)
    },
    insertRandom() {
      const LEN = this.items.length
      let i = Math.floor(Math.random() * LEN)
      this.items.splice(i, 0, dataTpl(i))
    }
  }
})