using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace 模板
{
    public partial class server : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string saye()
        {
            return "holle";
        }
        [WebMethod]
        public static List<Articles> getArticleListData()
        {
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            string sql = " select ArticleID, ArticleTitle,'' ArticleContent, Author from dbo.Articles ";
            List<Articles> list = ef.ExecuteStoreQuery<Articles>(sql).ToList();
            return list;
        }

        [WebMethod]
        public static Articles getArticleInfoByID(string id)
        {
            int ID = int.Parse(id);
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            Articles model = ef.Articles.Where(a => a.ArticleID == ID).First();
            return model;
        }

        [WebMethod]
        public static Articles getArticleInfoByID2(string id)
        {
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            string sql = " select * from dbo.Articles where ArticleID="+id;
            List<Articles> model = ef.ExecuteStoreQuery<Articles>(sql).ToList();
            return model[0];
        }

        [WebMethod]
        public static int delArticleById(string id)
        {
            int ID = int.Parse(id);
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            Articles model = ef.Articles.Where(a => a.ArticleID == ID).First();
            ef.DeleteObject(model);
            int i = ef.SaveChanges();
            return i;
        }

        [WebMethod]
        public static int saveArticle(string id, string title, string content)
        {
            int ID = int.Parse(id);
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            Articles model = ef.Articles.Where(a => a.ArticleID == ID).First();
            model.ArticleTitle = title;
            model.ArticleContent = content;
            int i = ef.SaveChanges();
            return i;
        }


        [WebMethod]
        public static int newArticle(string title, string content, string author)
        {
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            Articles model = new Articles();
            model.ArticleTitle = title;
            model.ArticleContent = content;
            model.Author = author;
            ef.Articles.AddObject(model);
            int i = ef.SaveChanges();
            return i;
        }

        [WebMethod]
        public static int newArticle2(string title, string content)
        {
            //数据库查询 字符串sql
            ArticleEntities ef = new ArticleEntities();
            string sql = " insert into Articles values('"+title+"','"+content+"','') ";
            int i = ef.ExecuteStoreCommand(sql);
            return i;
        }

        [WebMethod]
        public static string logout()
        {
            //退出session
            HttpContext.Current.Session["UserInfo"] = null;
            return "true";
        }

        [WebMethod]
        public static User userIsValid(string name, string psw)
        {
            //数据库查询
            ArticleEntities ef = new ArticleEntities();


            List<User> u = ef.User.Where(a => a.name == name && a.psw == psw).ToList();

            //string sql = " select * from dbo.[User]where name='bob' and psw='12345' ";
            //List<User> u = ef.ExecuteStoreQuery<User>(sql).ToList();

            if (u.Count == 1)
            {
                //写入session
                HttpContext.Current.Session["UserInfo"] = u[0];
          
                return u[0];
            }
            else {
                return null;
            }
        }

        [WebMethod]
        public static User userIsLogin()
        {
            if (HttpContext.Current.Session["UserInfo"] != null)
            {
                User u = HttpContext.Current.Session["UserInfo"] as User;
                return u;
            }
            else
            {
                return null;
            }
        }
        [WebMethod]
        public static int zhuce(string username, string psw)
        {
            ArticleEntities ef = new ArticleEntities(); 
            User model = new User();
            model.name = username;
            model.psw = psw;
            ef.User.AddObject(model);
            int i = ef.SaveChanges();
            return i;
        }
        //判断用户名存在
        [WebMethod]
        public static string userexist(string username)
        {
            ArticleEntities ef = new ArticleEntities();
            List<User> u = ef.User.Where(a => a.name == username).ToList();
            if (u.Count > 0)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }

        //获取评论表
        [WebMethod]
        public static List<pl> getpl(string id)
        {
            ArticleEntities ef = new ArticleEntities();
            List<pl> model = ef.pl.Where(a => a.articleid == id).ToList();
            return model;
        }
        [WebMethod]
        public static List<pl> getp2(string articleid)
        {
            //数据库查询
            ArticleEntities ef = new ArticleEntities();
            List<pl> model = ef.pl.Where(a => a.articleid == articleid).ToList();
            return model;
        }
        //评论
        [WebMethod]
        public static int pl(string author, string content, string sj, string articleid)
        {
            ArticleEntities ef = new ArticleEntities();
            pl model = new pl();
            model.conten = content;
            model.author = author;
            model.articleid = articleid;
            model.sj = sj;
            ef.pl.AddObject(model);
            int i = ef.SaveChanges();
            return i;
        }
    }
}