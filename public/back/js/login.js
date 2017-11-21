
;$(function(){
    var $form = $('form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fileds:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        messages:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    callback:{
                        message:"密码输入不正确"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"请输入6-12位的密码"
                    }
                }
            }
        }
    });
});


