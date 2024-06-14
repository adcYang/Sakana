$(document).ready(function () {

    $("#q2").click(function () {
        var z = new Date();
        var d = z.getMonth();
        var w = z.getDate();
        var s = z.getHours();
        var a = z.getMinutes();
        var sj = (d + 1) + "." + w + " " + s + ":" + a
        var author = $("#info").html();
        if (author == null) {
            alert("请登陆后评论")
            return;
        }
        var content = $("#content1").val();
        var articleid = $("#qq").html();
        var jsons = "{'content':'" + content + "','author':'" + author + "','sj':'" + sj + "','articleid':'" + articleid + "'}";
        $.ajax({
            type: "Post",
            url: "server.aspx/pl",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: jsons,
            success: function (data) {
                var i = data.d
                if (i > 0) {
                    alert("评论成功");
                    window.location.reload() ;

                }
                else {
                    alert("用户名不存在");
                }
            },
            error: function (err) {
                alert(data.d);
            }
        });
    });
});
function ger1() {
    var articleid = $("#qq").html();
    var id = getQueryStringByName("id");
    var dataJson = '{"id":"' + id + '"}';
    var jsonw = "{'articleid':'" + articleid + "'}"
    $.ajax({
        type: "Post", //http通信传参方式
        url: "server.aspx/getArticleInfoByID", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            article = data.d;
            author1 = "作者:" + article.Author;
            $("#title").html(article.ArticleTitle);
            $("#author").html(author1);
            $("#content").html(article.ArticleContent);
            $("#qq").html(article.ArticleID);
            $("#author1").html(article.Author)
        },
        error: function (err) {
            alert(err);
        }
    });
    $.ajax({
        type: "Post", //http通信传参方式
        url: "server.aspx/getp2", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: jsonw,
        //回调函数：
        success: function (data) {
            var pl = data.d;
            var plq = "";
            for (var i = 0; i < pl.length; i++) {
                plq += '<div class="media-body"><span class="text-center text-lg-left d-block">' + pl[i].sj + '</span><h5 class="mb-2 text-center text-lg-left">' + pl[i].author + '</h5><p class="text-center text-lg-left">' + pl[i].conten + '</p></div>'
            }
            $("#plq").html(plq);

        },
        error: function (err) {
            alert(err);
        }
    });
}

var article;

//获取地址栏参数
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}