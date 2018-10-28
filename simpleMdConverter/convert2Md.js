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


// 有三种匹配规则： 行内、换行（单行）、多行
// 已处理单行
// 行内匹配可在 单行内部做
// 多行 应该要先于单行做（但是还没做）
// 换行符对单行以上的规则是必须的，所以不需要支持单行文本多标签的解析
