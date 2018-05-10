function add(a) {
  let sum = 0
  function realAdd(a) {
    if (a === undefined) {
      return sum
    } else {
      sum += a
      return realAdd
    }
  }
  return realAdd(a)
}

console.log('2 + 32', add(2)(32)())

console.log('3 + 31', add(3)(31)())