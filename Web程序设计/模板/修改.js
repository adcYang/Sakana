$(document).ready(function () {

    $("#btn_save").click(function () {
        var id = $("#qq").html();
        var title = $("#title").val();
        var content = $("#content").val();
        saveInfo(title, content,id);
    });
    $("#btn3").click(function () {
        var dsd = 545454;
        var id = $("#qq").html();
        var data = '{"id":"' + id + '"}';
        $.ajax({
            type: "Post",
            // 方法所在页面和方法名
            url: "server.aspx/delArticleById",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: data,
            success: function (data) {
                alert("删除成功");
                window.location = "articleEditor.html"
            },
            error: function (er) {
            }
        });

    });
})

function saveInfo(title, content,id) {
    var dataJson = '{"title":"' + title + '","content":"' + content + '","id":"' + id + '"}';
    $.ajax({
        type: "Post", //http通信传参方式
        url: "server.aspx/saveArticle", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            var i = data.d;
            if (i > 0) {
                alert("修改成功！");
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
