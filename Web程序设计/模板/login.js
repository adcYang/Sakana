var currentUser;

function userIsLogin() {
    $.ajax({
        type: "Post",
        // 方法所在页面和方法名
        url: "server.aspx/userIsLogin",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            currentUser = data.d;
            if (currentUser == null) {
                return;
            } else {
                window.location = "home.html";
            }
        },
        error: function (er) {
        }
    });
}

$(document).ready(function () {
    userIsLogin();


$("#btn_login").click(function () {
    var userName = $("#username").val();
    var passWord = $("#pwd").val();
    if (userName == "" || passWord == "") {
        alert('用户名或密码不能为空，请重新输入！');
        return;
    }

    var dataJson='{"name":"'+userName+'","psw":"'+passWord+'"}';

    $.ajax({
        type: "Post",
        // 方法所在页面和方法名
        url: "server.aspx/userIsValid",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataJson,
        success: function (data) {
            data = data.d;
            if (data != null) {
                window.location = "home.html";
            }
            else {
                alert('登录失败，请检查账户！');
            }
        },
        error: function (er) {
            alert(er);
        }
    });
});

});