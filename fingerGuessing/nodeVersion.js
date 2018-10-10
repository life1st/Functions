const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

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

// console.log(beat(stone, cloth))
// console.log(beat(scissors, cloth))
// console.log(beat(cloth, cloth))

rl.question('Please input your select: 1:stone, 2.cloth, 3.scissors\n', answer => {
  answer = Number(answer)
  if (typeof answer != 'number' || answer > 3 || answer < 1) {
    console.log('not right number')
    rl.close()
  }
  const selectMap = ['stone', 'cloth', 'scissors']
  console.log(`Your select is: ${selectMap[answer - 1]}`)
  
  const arr = [stone, cloth, scissors]
  let computerPlayer = randomPlayer(arr)
  let realPlayer = arr[answer - 1]
  console.log(beat(computerPlayer, realPlayer))
  rl.close()
})