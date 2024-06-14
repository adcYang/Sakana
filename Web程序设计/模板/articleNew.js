$(document).ready(function () {

    $("#btn_save").click(function () {
        var author = $("author").val();
        var title = $("#title").val();
        var content = $("#content").val();
        saveInfo(title, content,author);
    });
})

function saveInfo(title, content) {
    var dataJson = '{"title":"' + title + '","content":"' + content + '","author":"' + author + '"}';
    $.ajax({
        type: "Post", //http通信传参方式
        url: "server.aspx/newArticle", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            var i = data.d;
            if (i > 0) {
                alert("发布成功！");
                window.location = "articleEditor.html"
            } else {
                alert("发布失败！");
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}

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
                alert("未登录");
            } else {
                author = currentUser.name ;
            }
            $("#author").html(author);
        },
        error: function (er) {
        }
    });
}

$(document).ready(function () {
    userIsLogin();
});
