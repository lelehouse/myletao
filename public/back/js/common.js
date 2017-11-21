

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