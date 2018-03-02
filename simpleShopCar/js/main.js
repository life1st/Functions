;(function () {
  var data = {}
  function datas() {

    this.set = function (item) {
      if (!!item) {
        data[item.id] = {
          name: item.name,
          price: item.price,
        }

        console.log('data update', data)
      } else {
        var items = tbody.querySelectorAll('tr')
        items.forEach((item) => {
          var id = item.dataset.id
          var name = item.querySelector('.name').innerText
          var price = item.querySelector('.price').innerText
          data[id] = {
            name: name,
            price: price
          }
        })

        console.log('data init', data)
      }
    }
    this.get = function () {
      return data
    }
    this.del = function (id) {
      if (data[id]) {
        delete data[id]
        price()
        console.log('data deleted', data)
      } else {
        console.error('no this data, please checkout.')
        console.log('data error', data)
      }
    }
    this.updataTotal = function () {
      var res = function () {
        var price = 0
        var num = 0
        for (var k in data) {
          price += (data[k].price * 1)
          num++
        }
        return {
          price: price.toFixed(2),
          num: num
        }
      }()
      var totalTpl = `${res.price}(${res.num}件商品)`
      return totalTpl
    }

    return this
  }

  var tbody = document.getElementsByTagName('tbody')[0];

  function add(items) {
    //item 通过参数传进来 这里用个函数模拟下。
    var item = newItem();
    var tr = document.createElement('tr')
    tr.setAttribute('data-id', item.id)
    var itemTpl =
      ` <td class="name">${item.name}</td>
        <td class="price">${item.price}</td>
        <td>
          <button class="delete-btn">删除</button>
        </td>`

    tr.innerHTML = itemTpl
    tbody.appendChild(tr)
    datas().set(item)
    price();
    // bind();
  }


  function bind() {
    tbody.addEventListener('click', function (event) {
      var dom = event.target
      if (dom.className === 'delete-btn') {
        var tr = dom.parentNode.parentNode
        var id = tr.dataset.id
        console.log('delete', id)
        tr.remove()
        datas().del(id)
      }
    })

    var addBtn = document.querySelector('.add-btn')
    addBtn.addEventListener('click', add)
  }

  function price() {
    document.querySelector('.total-price').innerText = datas().updataTotal();
  }

  // 'DOMContentLoaded' 在每次 DOM 更新后都会被调用，所以会重复 bind() ... 。
  // 但是也有可能是我绑定在 document 上了。
  // 找到原因了，80 行的 bind()。。。我...
  document.addEventListener('DOMContentLoaded', function () {
    console.log('dom ready.')
    bind()
    datas().set()
  })
})()


// 辅助函数 正式情况没啥用 就写外面了。

function newItem() {
  var item = {
    name: '随机商品' + Math.floor(Math.random() * 10),
    price: (Math.random() * 90).toFixed(2) * 1,
    id: Math.floor(Math.random() * 100)
  }

  return item
}