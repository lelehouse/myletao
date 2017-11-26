$(function(){
    //获取本地localStorage存的东西
    function getHistory(){
        var history = localStorage.getItem('lt_search_history') ||'[]';
        var arr = JSON.parse(history);
        return arr ;
    }
    
    function render(){
        var arr = getHistory();
        // 渲染到页面
        $('.search_history ul').html(template('tpl',{arr:arr}));
    }

    render();

    //清空所有记录
    $('.history_desc').on('click',function(){
        //改变数组，渲染
        localStorage.setItem('lt_search_history','[]');
        render();
    });

     
    //点击btn搜索,将新增的数据增加到最前面去
    $('.search_form button').on('click',function(){
        var arr = getHistory();
        var value = $(this).prev().val().trim();
        if(value.length===0){
            return false;
        }
        if(arr.indexOf(value)>0){
            //说明数据重复了，删除对应的下表的数据，
            arr.splice(arr.indexOf(value),1);
        }
          if(arr.length>=10){
            arr.pop();
        }
        arr.unshift($(this).prev().val());
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        $(this).prev().val("");
        render();
    });


    //点击删除，删除对应的数据，
    $('.search_history ul').on('click','span',function(){
        var that = $(this);
        var arr = getHistory();
        arr.splice(that.data('index'),1);
        // 删除对应的数组数据
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        render();
    });
});