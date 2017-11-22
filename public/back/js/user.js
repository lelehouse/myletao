$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                $("tbody").html(template("tpl",info));  
                //分页管理
                 $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, 
                    currentPage:currentPage, 
                    totalPages:Math.ceil(info.total/pageSize), 
                    size:"small",
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                    }
                  });
            }
        });
    }
    render();


    //注册点击事件，弹出模态框，点击确定后

    $("tbody").on('click','button',function(){
       $('.modal_userstatus').modal('show');
       
       //点击确定按钮，发送ajax请求，讲用户的data-id数据
      var id = $(this).parent().data('id');
      var isDelete = $(this).hasClass('btn-danger')?0:1;

      $(".btn_confirm").off().on('click',function(){
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
              if(info.success){
                  $(".modal_userstatus").modal('hide');
                  render();
              }
            }
        });
      })
    })
});