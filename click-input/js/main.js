//关键词选择框
window.onload = function () {

    function renewKeywords() {
        var keyWord = document.getElementById('keyWords').value;
        var keyWords = keyWord.split(' ');
        $('.keywords li').removeClass('active');
        texts = [];
        for(var i = 0;i<keyWords.length;i++){
            for(var j = 0;j<liKeyWords.length;j++){
                if(keyWords[i] == liKeyWords[j]){
                    texts.push($('.keywords li')[j].innerText);
                    $($('.keywords li')[j]).addClass('active');
                    break;
                }
            }
        }
    }

    var texts = [],
        liTexts = '';
    /*‘更多’按钮*/
    if($('.keywords li').length>10){
        $('#more_button').show();
    }//li多于10个才显示‘更多’按钮
    $('#more_button').on('click',function () {
        $('.keywords ul').css('height','auto');
        $('#more_button').hide();
    })//点击后隐藏

    var liKeyWords = [];
    for(var i = 0;i<$('.keywords li').length;i++){
        liKeyWords.push($('.keywords li')[i].innerText);
    }//遍历li标签，保存innerText到数组中
    console.log(liKeyWords);

    /*初始化已经选中的项目*/
    renewKeywords();
    /*点击li后，添加到input中，同时应用选中样式*/
    $('.keywords li').on('click',function () {
        var li = $(this),
            text = this.innerText,
            texts = document.getElementById('keyWords').value.split(' ');
        for(var i = 0;i<texts.length;i++){
            if(text === texts[i]){
                texts.splice(i,1);
                liTexts = texts.join(' ');
                $('input[name=keyWords]').css('width',5*texts.length+'em');
                li.removeClass('active');
                document.getElementById('keyWords').value = liTexts;
                return;
            }
        }
        $('input[name=keyWords]').css('width',5*texts.length+'em');

        texts.push(text);
        liTexts = texts.join(' ');
        li.addClass('active');
        document.getElementById('keyWords').value = liTexts;
    })
    /*在input输入数据后 为相同的li应用选中状态；*/
    $('#keyWords').bind('input propertychange', function() {
        renewKeywords();
    });
}