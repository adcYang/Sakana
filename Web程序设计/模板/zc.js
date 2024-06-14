$(document).ready(function () {
    $("#username").focus(function () {
        $(this).val("");
    }).blur(function () {
        var name = $(this).val();
        var jsonname = "{'username':'" + name + "'}";
        if (name.ltength == 0) {
            $("#errorinfo").hml("用户名不能为空").css("color", "red");
            return;
        }
        $.ajax({
            type: "Post",
            url: "server.aspx/userexist",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: jsonname,
            success: function (data) {
                if (data.d == "true") {
                    alert("该用户名已存在请重新输入");
                }
               
            },
            error: function (err) {

            }
        });

    });
    $("#btn1").click(function () {
        var name = $("#username").val();
        var psw1 = $("#psw").val()
        var jsonpsw = "{'username':'" + name + "','psw':'" + psw1 + "'}";
        if (name.length == 0 || psw1.length == 0) {
            $("#errorinfo").html("用户名或密码不能为空").css("color", "red");
            return;
        }
        $.ajax({
            type: "Post",
            url: "server.aspx/zhuce",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: jsonpsw,
            success: function (data) {
                var i = data.d;
                if (i > 0) {
                    alert("注册成功");
                }
                else {
                    alert("服务器繁忙稍后再试");
                }
            },
            error: function (err) {
                alert("注册失败");
            }
        });
    });
});