class ConvertMD {
  constructor({root, data}) {
    this.convert2Arr(data)
  }

  convert2Arr(data) {
    let res = data.split(/\n/).map(item => item.trim()).filter(item => !!item)

    let regs = {
      h1: /^#\s/,
      h2: /^#{2}\s/,
      h3: /^#{3}\s/,
      h4: /^#{4}\s/,
    }

    res = res.map(item => {
      for (let k in regs) {
        let match = item.match(regs[k])

        if (match !== null) {
          return `<${k}>${item.slice(match[0].length)}</${k}>`
        }
      }

      return `<p>${item}</p>`
    })
    this.data = res
  }

  appendTo(el) {
    el.innerHTML = this.data.reduce((prev, next) => prev + next)
  }
}