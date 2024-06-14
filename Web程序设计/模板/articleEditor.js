
var articleList;

$(document).ready(function () {
    getArticleList();
});

function getArticleList() {
    $.ajax({
        type: "Post", //http通信传参方式
        url: "server.aspx/getArticleListData", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        //回调函数：
        success: function (data) {
            articleList = data.d;
            var aStr = "";
            for (var i = 0; i < articleList.length; i++) {
                aStr += '<div class="col-12 col-md-6 col-lg-4 manage-color-hover wow slideInUp" data-wow-delay=".2s"><div class="product-item owl-theme product-listing-carousel owl-carousel"><div class="item p-item-img"><img src="static/picture/book-1.jpg" alt="images"><div class="text-center d-flex justify-content-center align-items-center"><a class="listing-cart-icon" href="shop-cart.html"><i class="fa fa-shopping-cart"></i></a></div></div><div class="item p-item-img"></div></div><div class="p-item-detail"><h4 class="text-center p-item-name"><a href="product-detail.html">' + articleList[i].ArticleTitle + '</a></h4><p class="text-center p-item-price">' + articleList[i].Author + '</p><button class="btn yellow-color-green-gradient-btn mt-1"><a href="articleInfo.html?id=' + articleList[i].ArticleID + '">阅读全文</a></button><button style="margin-left: 20px;" class="btn yellow-color-green-gradient-btn mt-1"><a href="articleList.html?id=' + articleList[i].ArticleID + '">修改文章</a></button></div></div>';
            }
            $("#articleList_container").html(aStr);
        },
        error: function (err) {
            alert(err);
        }
    });
}

