(function() {
  let inputEl = document.getElementById("realInputEl")
  let realVal = ''
  let currentIndex = 0
  function updateItem() {
    let start = currentIndex > 1 ? currentIndex : 1
    for (let i = start - 1; i < 4; i++) {
      document.querySelector(`.item${i}`).innerText = realVal[i] ? realVal[i] : ''
    }
  }
  function updateRealVal(val) {
    // 移除上一个光标
    let el = document.querySelector(`.item${currentIndex}`)
    el && el.classList.remove('current')
    // 更新 value 值
    realVal = val
    currentIndex = realVal.length
    // 在新的位置添加光标
    el = document.querySelector(`.item${currentIndex}`)
    el && el.classList.add('current')
  }
  inputEl.addEventListener('input', e => {
    inputEl.value = ''
    let data = e.data
    let reg = /[0-9]/
    if (reg.test(data) && realVal.length < 4) {
      updateRealVal(realVal + data)
    }
    updateItem()
  })
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      updateRealVal(realVal.slice(0, realVal.length - 1))
      updateItem()
    }
  })

  window.addEventListener('load', () => {
    inputEl.focus()
  })
})()