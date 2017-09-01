/*tab-menu setting. DONE..*/
function change(key) {
    console.log('change success.');
    $('.menu-tab li').removeClass('active');
    $('#tab_li'+key).addClass('active');

    $('.content').fadeOut(150,function () {
        $('.content').removeClass('active');
    });
    $('#content_'+key).fadeIn(150,function () {
        $('#content_'+key).addClass('active');
    });

}
//添加ID到侧面菜单
var menuLi = document.getElementsByClassName('menu-li');
for(var i = 0;i<menuLi.length;i++){
    menuLi[i].setAttribute('id','menu_li'+i);
}

var ot = 0;
//点击菜单
$('.menu-li').on('click',function (e) {
    //        e.preventDefault();
    var key = $(this).attr('id').replace('menu_li','');
    console.log(key);
    var text =this.innerText;
    console.log(text)
    // var tlink = $(this).attr('href');
    //如果不存在tab则创建
    if(!$('#tab_li'+key)[0]&&ot<10) {
        ot++;
        $('.menu-tab').append('<li class="tab-li" id="tab_li'+key+'" style="display: none;">'+text+'<span class="close-menutab" >×</span></li>');
        $('#tab_li'+key).fadeIn(150);
    }else if(ot>=10){
        alert('标签不能多余10个,请先关闭一些标签');
        var cgKey = $('.menu-tab li:last-child').attr('id').replace('menu_li','');
        change(cgKey);
        return false;
    }
    //如果不存在content则创建
    if(!$('#content_' + key)[0]) {
        $('.content-box').append('<div class="content" id="content_'+key+'"><p>'+text+'</p></div>');
    }
    change(key);
    return false;
});

//点击 tabs切换内容区
$('body').on('click','.tab-li',function (e) {
    var key = $(this)[0].id.replace('tab_li','');
    change(key);
})

//点击关闭按钮
$('body').on('click','.close-menutab',function (e) {
    e.preventDefault();
    ot--;
    var newKey = 0;
    var parent = $(this).parents('.tab-li');
    var key = parent.attr('id').replace('tab_li','');

    $('#content_'+key).hide(150,function () {
        $('#content_'+key).remove();
    })
    $('#tab_li'+key).fadeOut(150,function () {
        $('#tab_li'+key).remove();
        //关闭所有页面
        if($('.tab-li').length === 1){
            $('#menu-main').addClass('active');
            $('#content_main').fadeIn(150,function () {
                $('#content_main').addClass('active');
            });
            return false;
        }
        //关闭当前页面
        if(parent.attr('class').indexOf('active') !== -1){
            console.log('close act.'+parent.attr('class').indexOf('active'));
            newKey = $('.menu-tab li:last-child').attr('id').replace('tab_li','');
            change(newKey);
            return false;//阻止冒泡
        }
    })
    return false;
})

$("#menu-main").on('click',function (e) {
    $('.content').fadeOut(150,function () {
        $('.content').removeClass('active');
    });
    $('#content_main').fadeIn(150,function () {
        $('#content_main').addClass('active');
    })
    $('.menu-tab li').removeClass('active');
    $('#menu-main').addClass('active');
    return false;
})