package main

import (
	con "limuctf/controller"
	"limuctf/utils"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	jsoniter "github.com/json-iterator/go"
)

func main() {
	//调试模式
	gin.SetMode("debug")
	r := gin.Default()
	r.LoadHTMLGlob("template/*")  //这里是引入模板文件
	r.Static("/static", "static") //引入静态目录
	r.Static("/upload", "upload") //上传目录
	// 初始化基于redis的存储引擎
	// 参数说明：
	//    第1个参数 - redis最大的空闲连接数
	//    第2个参数 - 数通信协议tcp或者udp
	//    第3个参数 - redis地址, 格式，host:port
	//    第4个参数 - redis密码
	//    第5个参数 - session加密密钥
	redis_file := utils.Readfile("config/redis.json")
	redis_json := []byte(redis_file)
	link_max := jsoniter.Get(redis_json, "link_max").ToInt()
	links_way := jsoniter.Get(redis_json, "links_way").ToString()
	redis_address := jsoniter.Get(redis_json, "redis_address").ToString()
	redis_password := jsoniter.Get(redis_json, "redis_password").ToString()
	store, _ := redis.NewStore(link_max, links_way, redis_address, redis_password, []byte("maybe_used_something_intersting"))
	sessionName := []string{"a", "b"}
	r.Use(sessions.SessionsMany(sessionName, store))

	// 为 multipart forms 设置较低的内存限制 (默认是 32 MiB)
	r.MaxMultipartMemory = 4 << 20 // 8 MiB

	//路由
	//界面导向主路由
	r.GET("/", con.Index)
	r.POST("/", con.Index)
	r.GET("/topic", con.Topic)
	r.POST("/topic", con.Topic)
	r.GET("/getcontent", con.Getcontent)
	r.POST("/getcontent", con.Getcontent)
	r.GET("/game", con.Game)
	r.POST("/game", con.Game)
	// r.GET("/test", con.Test)
	// r.POST("/test", con.Test)

	//api
	r.GET("/logout", con.Logout)
	r.POST("/logout", con.Logout)
	r.GET("/signin", con.Signin)
	r.POST("/signin", con.Signin)
	r.GET("/register", con.Register)
	r.POST("/register", con.Register)
	r.GET("/user_mgr", con.User_mgr)
	r.POST("/user_mgr", con.User_mgr)
	r.GET("/ann_mgr", con.Ann_mgr)
	r.POST("/ann_mgr", con.Ann_mgr)
	r.GET("/topic_mgr", con.Topic_mgr)
	r.POST("/topic_mgr", con.Topic_mgr)
	r.GET("/con_mgr", con.Con_mgr)
	r.POST("/con_mgr", con.Con_mgr)
	r.GET("/mechine_mgr", con.Mechine_mgr)
	r.POST("/mechine_mgr", con.Mechine_mgr)

	//后台管理api
	api := r.Group("/api")
	{
		api.GET("/deluser", con.Deluser)
		api.POST("/deluser", con.Deluser)
		api.GET("/chpasswd", con.Chpasswd)
		api.POST("/chpasswd", con.Chpasswd)
		api.GET("/newann", con.Newann)
		api.POST("/newann", con.Newann)
		api.GET("/delann", con.Delann)
		api.POST("/delann", con.Delann)
		api.GET("/delcon", con.Delcon)
		api.POST("/delcon", con.Delcon)
		api.GET("/newtopic", con.Newtopic)
		api.POST("/newtopic", con.Newtopic)
		api.GET("/deltopic", con.Deltopic)
		api.POST("/deltopic", con.Deltopic)
		api.GET("/newmechine", con.Newmechine)
		api.POST("/newmechine", con.Newmechine)
		api.GET("/delmechine", con.Delmechine)
		api.POST("/delmechine", con.Delmechine)
		api.GET("/getmechine", con.Getmechine)
		api.POST("/getmechine", con.Getmechine)
		api.GET("/gettopic", con.Gettopic)
		api.POST("/gettopic", con.Gettopic)

	}
	config_file := utils.Readfile("config/web.json")
	config_json := []byte(config_file)
	ip_port := jsoniter.Get(config_json, "port").ToString()
	r.Run(":" + ip_port)

}
