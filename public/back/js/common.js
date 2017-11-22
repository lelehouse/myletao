

//进度条功能

NProgress.configure({ showSpinner: false });

 $(document).ajaxStart(function(){
    NProgress.start();
 });
 $(document).ajaxStop(function(){
     setTimeout(function(){
        NProgress.done();
     },500);
    
 });





 //侧边栏隐藏问题
 $(".icon_menu").on('click',function(){
    $(".aside").toggleClass("now");
    $(".main").toggleClass("now");
});
 //侧边栏的二级菜单
$(".category").on("click",function(){
    $(this).next().toggle(400);
});

//右边退出功能
$(".icon_logout").on('click',function(){
    $(".modal_logout").modal("show");
});



 if( location.href.indexOf("login.html")==-1){
    // 所有页面都要发送ajax请求，确认用户是否登录
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
          if(data.error === 400){
            //说明用户没有登录，跳转到登录页面
            location.href = "login.html";
          }
        }
    })
 }

 $(".btn_log").on("click",function(){
     $.ajax({
         type:"get",
         url:"/employee/employeeLogout",
         success:function(data){
            if(data.success){
                location.href ="login.html";
            }
         }
     });
 })