var currentUser;
//判断用户是否已登录
function userIsLogin() {
    $.ajax({
        type: "Post",
        // 方法所在页面和方法名
        url: "server.aspx/userIsLogin",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            currentUser = data.d;
            var info;
            if (currentUser == null) {
                info = "当前未登陆！";
            } else {
                info = "用户" + currentUser.name + ",您目前的积分为 " + currentUser.score;
            }
            $("#info").html(info);
        },
        error: function (er) {
        }
    });
}

$(document).ready(function () {
    userIsLogin();
});



