$(function(){
    var currentPage = 1;
    var pageSize = 5; 
    
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template('tpl',info));
                //点击的时候调用模态框
                $('.content .btn_add').on('click',function(){
                    $(".modal_addfirst").modal('show');
                });
                 //分页功能
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
   

   
   //添加分类
       //先表单效验
       $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'请输入一级分类名'
                    }
                }
            }
          }
       });
       $('form').on('success.form.bv',function(e){
            e.preventDefault();
                $.ajax({
                    type:"post",
                    url:"/category/addTopCategory",
                    data:$('form').serialize(),
                    success:function(info){
                        if(info.success){
                        $('.modal_addfirst').modal('hide');
                        render();
                        //初始化样式和内容
                        $('form').data('bootstrapValidator').resetForm();
                        $('form')[0].reset();
                        }
                    }
                });
             
       });
    
      
});