$(function(){
    $.ajax({
        type:'get',
        url:"/category/queryTopCategory",
        success:function(info){
            $('.category_l ul').html(template('tpl_l',info));
            render(info.rows[0].id);
        }
    });

    function render(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(info){
                $('.category_r ul').html(template('tpl_r',info));  
            }
        });
    }


    // 给左侧的所有li注册时间
    $('.category_l ul').on('click',"li",function(){
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');
        render(id);

        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶2
        // mui('.category_r').scroll().scrollTo(0,0,500);//100毫秒滚动到顶2
    });
});