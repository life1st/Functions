import Canvas from './canvas'
import Huaji from './huaji'
import { getParams, randomNum} from "./utils";
import huajiImg from '../imgs/huaji.png'

let el = document.querySelector('#huajiWrap')
let canvas = new Canvas(el)
canvas.setSize(document.body.clientWidth, document.body.clientHeight)

let params = getParams()

let huajiCount = 0
const COUNT = params.count || 300


const huajis = []
const img = new Image()
img.src = huajiImg
img.onload = function() {
  for (let i = 0; i < COUNT; i++) {
    huajis.push(new Huaji())
  }

  huajis.forEach(huaji => {
    huaji.setPosition(randomNum(0, document.body.clientWidth)
      , randomNum(0, document.body.clientHeight))
    let size = randomNum(20, 300)
    huaji.setSize(size, size)
    huaji.img.onload = function() {
      huajiCount += 1
      anima()
    }
  })
}

function anima() {
  if (huajiCount < COUNT) return
  requestAnimationFrame(realAnima)
}

function realAnima() {
  canvas.clear()
  huajis.forEach(huaji => {
    const {img, position, size} = huaji.getAnimateInfo(canvas)
    canvas.drwaImg(img, position.left, position.top, size.width, size.height)
  })

  requestAnimationFrame(realAnima)
}