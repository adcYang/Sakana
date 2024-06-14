
var articleList;

$(document).ready(function () {
    getArticleList();
})

function getArticleList() {
    $.ajax({
        type: "Post", //http通信传参方式 post get
        url: "server.aspx/getArticleListData", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        //回调函数：
        success: function (data) {
            articleList = data.d;
            var aStr = "";
            for (var i = 0; i < articleList.length; i++) {
                aStr += '<a href="articleInfo.html?id=' + articleList[i].ArticleID + '">' + articleList[i].ArticleTitle + '---' + articleList[i].Author + '</a><br/>';
            }
            $("#articleList_container").html(aStr);
        },
        error: function (err) {
            alert(err);
        }
    });
}