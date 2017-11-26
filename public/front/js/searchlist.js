$(function(){

    var currentpage = 1;
    var pageSize = 100;
//    进来的时候渲染商品列表页面

    var proName = tools.getsearchkey("key");
    $('.search_form input').val(proName);
    render();

    // 将value值设置给input框
        //  记得要先解码
        //给type注册事件
        

    $('.search_form button').on('click',function(){
        proName = $('.search_form input').val();
        render();
    });


    $('.list_order [data-type]').on('click',function(){
            // console.log(111);
            //思路：
 //如果当前a标签，有now这个类， 需要改箭头方向
 //如果当前a标签没有now这个类，
 //1. 让当前a有now这个类，移除其他a标签的now这个类
 //2. 让所有的a标签的箭头都往下
 var $this = $(this);
 
  if($this.hasClass("active")){
  //有now这个类，需要换箭头， 找到当前a下的span，
  $this.find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
  }else { 
  $this.addClass("active").siblings().removeClass("active");
  $(".list_order span").removeClass("fa-angle-up").addClass("fa-angle-down");
  }
  render();

     });


     
    function render(){
        var options = {};
        options.page = currentpage;
        options.pageSize = pageSize;
        options.proName = proName;
        //判断是否有类名
        if($('.list_order [data-type]').hasClass('active')){
            // 有active这个类名，就设置参数
            var type= $('.list_order a.active').data('type');
            var value = $('.list_order a.active').find('span').hasClass('fa-angle-down') ? 2:1;
            options[type] = value;
        }
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:options,
            success:function(info){
                // console.log(info);
                $('.product ul').html(template('tpl',info));

            }
        });
    }

});