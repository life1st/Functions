;(function () {
  function add(items) {
    //item 通过参数传进来 这里用个函数模拟下。
    var item = newItem();
    var itemTpl =
      ` <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="delete-btn">删除</button>
        </td>`

    var tr = document.createElement('tr')
    tr.innerHTML = itemTpl
    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.appendChild(tr)
    price();
    bind();
  }


  function bind() {
    var tr = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    // console.log(tr)

    for(var i = 0;i<tr.length;i++){
      tr[i].getElementsByTagName('td')[2].addEventListener('click',function(e){
        this.parentNode.remove();
        // console.log(this.parentNode)
        price();
      })
    }
  }

  function price() {
    var tr = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var Prices = 0;
    console.log(tr)
    for(var i = 0;i<tr.length;i++){
      console.log(tr[i].getElementsByTagName('td')[1].innerText)
      Prices += Math.round((tr[i].getElementsByTagName('td')[1].innerText)*100)/100;
    }
    // console.log(Prices)
    document.getElementsByTagName('tfoot')[0].getElementsByTagName('td')[0].innerText = Prices +'('+tr.length+'件商品)'
  }

  document.addEventListener('DOMContentLoaded', function () {
    console.log('dom ready.')
    var addBtn = document.querySelector('.add-btn')
    addBtn.addEventListener('click', add)
  })
})()


// 辅助函数 正式情况没啥用 就写外面了。

function newItem() {
  var item = {
    name: '随机商品' + Math.floor(Math.random() * 10),
    price: (Math.random() * 90).toFixed(2) * 1
  }

  return item
}