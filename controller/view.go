package controller

import (
	// "github.com/gin-contrib/sessions"
	// "github.com/gin-contrib/sessions/cookie"

	"html/template"
	"limuctf/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

//主界面
func Index(c *gin.Context) {
	person_data1 := `<span class="ax-grade"><span class="ax-btns"><a href="###" class="ax-iconfont ax-icon-down" style="background-image: url(`
	person_data2 := `);"></a></span><ul class="ax-outer"><li>&nbsp;&nbsp;用户： `
	person_data3 := `</li><li><a href="/person">个人界面</a></li><li><a href="/logout">注销</a><span class="ax-iconfont ax-icon-right"></span></li></ul></span>`
	image_url := "https://cdn.jsdelivr.net/gh/Bhaoo/Cuckoo@1.0.5/assets/images/head.png"
	sessiona := Getsessiona(c, "username")
	person_data := ""
	if sessiona == nil {
		person_data = `<span class="ax-grade"><span class="ax-btns"><a href="#" class="ax-iconfont ax-icon-down" style="background-image: url();"></a></span><ul class="ax-outer"><li><a href="#" id="signform">登录</a></li><li><a href="#" id="registerform">注册</a><span class="ax-iconfont ax-icon-right"></span></li></ul></span>`
	} else {
		person_data = person_data1 + image_url + person_data2 + sessiona.(string) + person_data3
	}

	c.HTML(http.StatusOK, "index.html", gin.H{
		"person_data": template.HTML(person_data), //个人头像链接
	})
}

//题目界面
func Topic(c *gin.Context) {
	sessiona := Getsessiona(c, "username")
	person_data1 := `<span class="ax-grade"><span class="ax-btns"><a href="###" class="ax-iconfont ax-icon-down" style="background-image: url(`
	person_data2 := `);"></a></span><ul class="ax-outer"><li>&nbsp;&nbsp;用户： `
	person_data3 := `</li><li><a href="/person">个人界面</a></li><li><a href="/logout">注销</a><span class="ax-iconfont ax-icon-right"></span></li></ul></span>`
	image_url := "https://cdn.jsdelivr.net/gh/Bhaoo/Cuckoo@1.0.5/assets/images/head.png"
	person_data := ""
	topic_data := ""

	topic_type := c.Query("type")
	if sessiona == nil {
		c.Redirect(http.StatusFound, "/")
	} else {
		person_data = person_data1 + image_url + person_data2 + sessiona.(string) + person_data3
	}

	topic_data1 := `<a class="card" id="topic" name="`
	topic_data2 := `" topic_type="`
	topic_data3 := `"><div class="header" style="pointer-events: none;"><h1>`
	topic_data4 := `</h1><h3>socre:  `
	topic_data5 := `<h3></div></a>`
	db := model.LinkDb()
	var topic []model.Topics
	// data1 + 名字 + data2 + 标题 + data3 + 分数 +data4
	db.Where("type = ?", topic_type).Find(&topic)
	for _, value := range topic {
		rescore := strconv.Itoa(value.Score)
		topic_data = topic_data + topic_data1 + value.Name + topic_data2 + value.Type + topic_data3 + value.Name + topic_data4 + rescore + topic_data5
	}
	//fmt.Printf(topic_type)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "index.html", gin.H{
		"person_data": template.HTML(person_data),
		"topic_data":  template.HTML(topic_data),
	})
}

// //测试界面
// func Test(c *gin.Context) {
// 	c.HTML(http.StatusOK, "game.html", gin.H{})
// }

// func Upload(c *gin.Context) {

// 	file, _ := c.FormFile("file")
// 	fmt.Printf(file.Filename)
// 	c.String(http.StatusOK, "hello")
// }
