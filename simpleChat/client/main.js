let id = Math.floor(Math.random() * 10000)
const msgTpl = (msg, time) => (`
<li class='chat-item'>
  <p class='time'>${time}</p>
  <p class='msg'>${msg}</p>
</li>
`)
const formetTime = (timeStamp) => {
  let time = new Date(timeStamp)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hour = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  return `${year} - ${month} - ${day} / ${hour} : ${minutes} : ${seconds}`
}
const chatWrapEl = document.querySelector('.chat')

socket.on('newMsg', (data) => {
  chatWrapEl.innerHTML += msgTpl(data.msg, formetTime(data.time))
})

// send
const sendBtnEl = document.querySelector('#sendBtn')
const msgEl = document.querySelector('#msg')
sendBtnEl.addEventListener('click', (event) => {
  if (msgEl.value == '') return
  socket.emit('sendMsg', {
    msg: msgEl.value,
    id: id
  })
})