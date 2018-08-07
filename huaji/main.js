let el = document.querySelector('#huajiWrap')
let canvas = new Canvas(el)
console.log(canvas)
canvas.setSize(document.body.clientWidth, document.body.clientHeight)
console.log(canvas)


let huajiCount = 0
const COUNT = 200

let huajis = []
for (let i = 0; i < COUNT; i++) {
  huajis.push(new Huaji())
}
huajis.forEach(huaji => {
  huaji.setPosition(randomNum(20, 1000), randomNum(50, 1200))
  let size = randomNum(20, 150)
  huaji.setSize(size, size)
  huaji.img.onload = function() {
    huajiCount += 1
    anima()
  }
})
function anima() {
  if (huajiCount < COUNT) return
  requestAnimationFrame(realAnima)
}

function realAnima() {
  canvas.clear()
  huajis.forEach(huaji => huaji.animation(canvas))

  requestAnimationFrame(realAnima)
}