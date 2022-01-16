package controller

import (
	_ "limuctf/utils"

	"github.com/gin-contrib/sessions"
	_ "github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
)

func Setsession(c *gin.Context, key1 string, username string, key2 string, container_id string, key3 string, user_id string) {
	sessionA := sessions.DefaultMany(c, "a")
	option := sessions.Options{MaxAge: 3600 * 2} //2小时后过期
	sessionA.Options(option)
	sessionA.Set(key1, username)     //把用户ID存进session,后面拿出来确认
	sessionA.Set(key2, container_id) //key1:username; key2:container_id;
	sessionA.Set(key3, user_id)
	sessionA.Save()
}

func Getsessiona(c *gin.Context, key string) interface{} {
	sessionA := sessions.DefaultMany(c, "a")
	return sessionA.Get(key)
}

func Nullsession(c *gin.Context, key1 string, key2 string, key3 string) {
	sessionA := sessions.DefaultMany(c, "a")
	sessionA.Delete(key1)
	sessionA.Save()
}
