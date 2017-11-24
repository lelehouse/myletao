$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){

                $('tbody').html(template('tpl',info));

                $('.paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total/pageSize),
                    size:"small",
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }

                });
            }
        })
    }

    render();

    //点击添加商品按钮

    $('.btn_add').on('click',function(){
        $('.modal_product').modal('show');        
    });

    //图片上传
    var imgarr = [];
    $("#fileupload").fileupload({
        dataType:"json",//指定响应的格式
        done:function (e, data) {//图片上传成功之后的回调函数
        //通过data.result.picAddr可以获取到图片上传后的路径
        //设置给img_box中img的src属性
        $(".img_box").append('<img src='+data.result.picAddr+' width="100" height="100" alt="">');
            //把图片的地址赋值给productlogo
        //    $("[name='productlogo']").val(data.result.picAddr);
            imgarr.push(data.result);
            //把样式改成成功
            if(imgarr.length===3){
                $('form').data("bootstrapValidator").updateStatus("productlogo", "VALID");
            }else{
                $('form').data("bootstrapValidator").updateStatus("productlogo", "INVALID");
            }
        }
    });
   



    $('tbody').on('click','.btn',function(e){
         if($(e.target).hasClass("btn_status")){
            // 说明点击是上下架
            // console.log(111);
            var id = $(this).parent().data('id');
            var statu = $(".btn_status").hasClass("btn-danger") ? 1:0;
            //点击跳出模态框
           $('.modal_statu').modal('show');
           $('.btn_confirm').on('click',function(){
               $.ajax({
                   type:"post",
                   url:"/product/updateProduct",
                   
               });
           });
         }else{
            //点击的是编辑，跳出模态框
            // 编辑页面
         }
         
    });


    // 先bootstrapValidator验证，验证成功在进行发送ajax请求
    //使用upload插件图片上传功能
    $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    }
                }
            },
            statu:{
                validators:{
                    notEmpty:{
                        message:"请输入商品上下架"
                    }
                }
            },
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请输入归属品牌"
                    }
                }
            },
            productlogo:{
                validators:{
                    notEmpty:{
                        message:"请上传三张商品图片"
                    }
                }
            }
        }
    });
    
    $form.on('success.form.bv',function(e){
       e.preventDefault();
        //发送ajax请求
        var data = $form.serialize();
        data += "&picName1="+imgarr[0].picName+"&picAddr1="+imgarr[0].picAddr;
        data += "&picName2="+imgarr[1].picName+"&picAddr2="+imgarr[1].picAddr;
        data += "&picName3="+imgarr[2].picName+"&picAddr3="+imgarr[2].picAddr;
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:$form.serialize(),
            success:function(info){
                if(info.success){
                    $('.modal_product').modal('hide');
                    render();
                }
                $form[0].reset();
                $form.data('bootstrapValdator').resetForm();
                $('.img_box img').remove();
                imgarr = [];
            }
        });


    });
   

});