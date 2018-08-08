import Canvas from './canvas'
import Huaji from './huaji'
// import "./utils";
import { getParams, randomNum} from "./utils";

let el = document.querySelector('#huajiWrap')
let canvas = new Canvas(el)
canvas.setSize(document.body.clientWidth, document.body.clientHeight)

let params = getParams()

let huajiCount = 0
const COUNT = params.count || 400

let huajis = []
for (let i = 0; i < COUNT; i++) {
  huajis.push(new Huaji())
}
huajis.forEach(huaji => {
  huaji.setPosition(randomNum(0, document.body.clientWidth)
    , randomNum(0, document.body.clientHeight))
  let size = randomNum(20, 200)
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