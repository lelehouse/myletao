$(function(){
    var currentPage = 1;
    var pageSize = 5; 
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('tpl',info));
                //点击的时候调用模态框
                $('.content .btn_add').on('click',function(){
                    //显示页面数据
                    $(".modal_addsecond").modal('show');
                });
                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(info.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
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
   

 //显示下拉列表
 $("#dLabel").on('click',function(){
    $.ajax({
        type:"get",
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            $('.dropdown-menu').html(template('tpl2',info));
        }
    });
});

$(".dropdown-menu").on('click','li',function(){
     $(".firstcatename").text($(this).text());
     $("[name='categoryId']").val($(this).data("id"));
         //3. 让categoryId校验变成成功
     $("[name='hot']").val(1);
     $('form').data("bootstrapValidator").updateStatus("hot", "VALID");
             //随便给hot设置一个值，不需要，但是后台就必须要传这个值
     $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
})


//图片上传
$("#fileupload").fileupload({
    dataType:"json",//指定响应的格式
    done:function (e, data) {//图片上传成功之后的回调函数
      //通过data.result.picAddr可以获取到图片上传后的路径
    //   console.log(data);
    //   console.log(data.result.picAddr);
      //设置给img_box中img的src属性
      $(".img_box img").attr("src", data.result.picAddr);
         //把图片的地址赋值给brandLogo
      $("[name='brandLogo']").val(data.result.picAddr);
         
        //把brandLogo改成成功
       $('form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
   

   
   //添加分类
       //先表单效验
       $('form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类名'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类名'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
            
          }
       });
       $('form').on('success.form.bv',function(e){
            e.preventDefault();
                $.ajax({
                    type:"post",
                    url:"/category/addSecondCategory",
                    data:$('form').serialize(),
                    success:function(info){
                        console.log(111);
                        if(info.success){
                        $('.modal_addsecond').modal('hide');
                        render();
                        //初始化样式和内容
                        $('form').data('bootstrapValidator').resetForm();
                        $('form')[0].reset();
                        //清空分类名称，清空图片
                        $(".img_box img").attr("src","./img/none.png");
                        $('.firstcatename').text("请选择一级分类名称");
                        $("categoryId").val('');
                        $('brandName').val('');
                        }
                    }
                });
       });
    

});