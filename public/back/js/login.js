;$(function () {
  var $form = $('form')
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          callback: {
            message: '密码输入不正确'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '请输入6-12位的密码'
          }
        }
      }
    }
  })

  $form.on('success.form.bv', function (e) {
    e.preventDefault()
    // 使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      success: function (data) {
        if (data.success) {
          location.href = 'index.html'
        }
        if (data.error == 1000) {
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        }
        if (data.error == 1001) {
            $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  })
})
