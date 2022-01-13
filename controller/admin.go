package controller

import (
	"limuctf/model"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

//登陆
func Signin(c *gin.Context) {
	Nullsession(c, "username", "container_id")
	username := c.PostForm("username")
	password := c.PostForm("password")
	db := model.LinkDb()
	var signer []model.Sign
	if err := db.Where(" username = ? ", username).First(&signer).Error; err == nil {
		if signer[0].Password == password {
			c.String(http.StatusOK, "success")
			Setsession(c, "username", username, "container_id", "null")
		} else {
			c.String(http.StatusOK, "密码错误")
		}
	} else {
		c.String(http.StatusOK, "密码错误")
	}
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
}

//注册

func Register(c *gin.Context) {
	Nullsession(c, "username", "container_id")
	username := c.PostForm("username")
	password := c.PostForm("password")
	conform := c.PostForm("conform")
	qq_id := c.PostForm("qqnum")
	sign_time := time.Now()
	email := c.PostForm("email")
	db := model.LinkDb()
	users := model.User{}
	data := ""
	db.Where("username = ?", username).First(&users)
	if users.ID != 0 {
		data = "此昵称已注册"
	} else if password != conform {
		data = "两次输入的密码不一致"
	} else {
		sign := model.Sign{Username: username, Password: password}
		users = model.User{Username: username, QQ: qq_id, Sign_time: &sign_time, Email: email, Stores: 0}
		db.Create(&users)
		db.Create(&sign)
		sqlDb, _ := db.DB()
		defer sqlDb.Close()
		data = "success"
	}
	c.String(http.StatusOK, data)
}

//注销
func Logout(c *gin.Context) {
	Nullsession(c, "username", "container_id")
	c.Redirect(http.StatusFound, "/")
}
