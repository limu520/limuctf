package controller

import (
	_ "limuctf/utils"

	"github.com/gin-contrib/sessions"
	_ "github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
)

func Setsession(c *gin.Context, key1 string, username string, key2 string, container_id string) {
	sessionA := sessions.DefaultMany(c, "a")
	sessionB := sessions.DefaultMany(c, "b")
	option := sessions.Options{MaxAge: 3600 * 2} //2小时后过期
	sessionA.Options(option)
	sessionB.Options(option)
	sessionA.Set(key1, username)     //把用户ID存进session,后面拿出来确认
	sessionB.Set(key2, container_id) //key1:username; key2:container_id;
	sessionA.Save()
	sessionB.Save()
}

func Getsessiona(c *gin.Context, key1 string) interface{} {
	sessionA := sessions.DefaultMany(c, "a")
	return sessionA.Get(key1)
}

func Getsessionb(c *gin.Context, key2 string) interface{} {
	sessionB := sessions.DefaultMany(c, "b")
	return sessionB.Get(key2)
}

func Nullsession(c *gin.Context, key1 string, key2 string) {
	sessionA := sessions.DefaultMany(c, "a")
	sessionB := sessions.DefaultMany(c, "b")
	sessionA.Delete(key1)
	sessionB.Delete(key2)
	sessionA.Save()
	sessionB.Save()
}
