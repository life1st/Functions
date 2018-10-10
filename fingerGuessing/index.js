class ListNode {
  constructor(val, next) {
    this.val = val
    this.next = next ? next : null
  }

  setNext(val) {
    if (!val) throw 'can\'t read undefined next'
    this.next = val
  }
}

function beat(player1, player2) {
  if (player1.next.val === player2.val) {
    return 2
  } else if (player2.next.val === player1.val) {
    return 1
  } else {
    return -1
  }
}

function randomPlayer(arr) {
  let randomNum = Math.random()
  let len = arr.length
  let range = 1 / len
  return arr[Math.floor(randomNum / range)]
}
// prev -> val -> next

let stone = new ListNode('stone')
let cloth = new ListNode('cloth')
let scissors = new ListNode('scissors')

stone.setNext(cloth)
cloth.setNext(scissors)
scissors.setNext(stone)

;((function () {
  // data
  const options = [stone, cloth, scissors]

  // DOM
  const formEl = document.querySelector('form')
  const startEl = document.getElementById('start')
  const computerChooseEl = document.getElementById('computerChoose')
  const playerChooseEl = document.getElementById('playerChoose')
  const resEl = document.getElementById('result')
  startEl.addEventListener('click', () => {
    let selectOption = formEl.querySelector('input:checked')
    if (selectOption) {
      let index = selectOption.dataset.index
      let computerChoose = randomPlayer(options)
      let playerChoose = options[index]
      let winner = beat(computerChoose, playerChoose)
      let resText = 'winner is '
      switch (winner) {
        case 1:
          resText += 'computer'
          break
        case 2:
          resText += 'you'
          break
        case -1:
          resText = 'nobody win'
          break
      }
      computerChooseEl.innerText = `computer choose is: ${computerChoose.val}`
      playerChooseEl.innerText = `your choose is: ${playerChoose.val}`
      resEl.innerText = resText
      selectOption.checked = false
      selectOption.removeAttribute('checked')
    } else {
      // todo 处理无选中状态
    }
  })
})())