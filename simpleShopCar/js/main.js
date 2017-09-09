bind();
function add(items) {
    // console.log('yes')
    var nTr = document.createElement('tr')
    var ntdname = document.createElement('td')
    var ntdnametext = document.createTextNode('items.name')
    ntdname.appendChild(ntdnametext)
    var ntdprice = document.createElement('td')
    var ntdpricetext = document.createTextNode('5.65')
    ntdprice.appendChild(ntdpricetext)
    var ntda = document.createElement('td')
    var na = document.createElement('a')
    var natext = document.createTextNode('删除')
    na.setAttribute('href','javascript:void(0);')
    na.appendChild(natext)
    ntda.appendChild(na)
    nTr.appendChild(ntdname)
    nTr.appendChild(ntdprice)
    nTr.appendChild(ntda)
    // console.log(nTr)
    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.appendChild(nTr)
    // console.log(tr);
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