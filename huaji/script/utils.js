function randomNum(min, max) {
  let range = max - min + 1
  return Math.floor(Math.random() * range + min)
}

function getParams() {
  let params = window.location.search
  params = params.slice(1)
  let arr = params.split('&')
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    let kv = arr[i].split('=')
    obj[kv[0]] = kv[1]
  }
  return obj
}

export {
  randomNum, getParams
}