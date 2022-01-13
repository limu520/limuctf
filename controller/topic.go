package controller

import (
	"fmt"
	"limuctf/model"
	"limuctf/utils"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

//获取题目内容
func Getcontent(c *gin.Context) {
	sessiona := Getsessiona(c, "username")
	sessionb := Getsessionb(c, "container_id")
	if sessiona == nil {
		c.Redirect(http.StatusFound, "/")
	}
	topic_name := c.PostForm("name")
	db := model.LinkDb()
	var topic []model.Topics
	var flag []model.Flags
	db.Where("name = ?", topic_name).First(&topic)
	con_status := ""
	result := db.Where("username = ?", sessiona.(string)).First(&flag)
	if result.RowsAffected == 0 {
		con_status = ""
	} else if flag[0].Topic_id != topic[0].ID {
		con_status = "已在其他题目启动了容器"
	} else {
		con_status = sessionb.(string)
	}
	context := ""
	if topic[0].Attachment != "" {
		context = topic[0].Attachment
	}
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if context == "" {
		c.JSON(200, gin.H{
			"status":  con_status,
			"content": "<p>" + topic[0].Content + "</p>", //题目名称
		})

	} else {
		c.JSON(200, gin.H{
			"status":  con_status,
			"content": "<p>" + topic[0].Content + "</p>", //题目名称
			"upload":  `附件：&nbsp;&nbsp;` + `<a href="` + context + `" class="ax-btn ax-success">附件</a>`,
		})
	}
}

//启动容器
func Game(c *gin.Context) {
	sessiona := Getsessiona(c, "username")
	if sessiona == nil {
		c.Redirect(http.StatusFound, "/")
	}
	name := c.PostForm("name")
	db := model.LinkDb()
	var topic []model.Topics
	var mechine []model.Mechine
	var flag []model.Flags
	create_time := time.Now()
	status := ""
	db.Where("name = ?", name).First(&topic)
	images_name := topic[0].Image_name
	port := topic[0].Private_port
	open_port := 0
	db.Where("ID = ?", topic[0].Mechine_id).First(&mechine)
	testflag := db.Where("mechine_id = ?", topic[0].Mechine_id).Last(&flag)
	if testflag.RowsAffected == 0 {
		open_port = mechine[0].Min_port
	} else {
		open_port = flag[0].Port + 1
	}
	if open_port == mechine[0].Max_port+1 {
		open_port = mechine[0].Min_port
	}
	for i := open_port; i <= mechine[0].Max_port; i++ {
		if db.Where("port = ? ", i).First(&flag).RowsAffected == 0 {
			open_port = i
			status = "success"
			break
		} else if i == mechine[0].Max_port {
			status = "无端口分配"
		}
	}
	reopen_port := fmt.Sprintf("%d", open_port)
	true_flag := "flag{" + string(utils.RandLow(32)) + "}"

	utils.D_run("tcp://"+mechine[0].Url, sessiona.(string)+name, images_name, port, reopen_port, true_flag)

	container := model.Flags{Username: sessiona.(string), Topic_id: topic[0].ID, Container_id: sessiona.(string) + name, Mechine_id: mechine[0].ID, Port: open_port, Flag: true_flag, Create_time: &create_time}
	db.Create(&container)

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	url := mechine[0].Url
	url_num := strings.Index(url, ":")
	Setsession(c, "username", sessiona.(string), "container_id", "http://"+url[:url_num]+":"+reopen_port)
	c.JSON(200, gin.H{
		"status":    status,
		"topic_url": "http://" + url[:url_num] + ":" + reopen_port,
	})
}

//提交flag并且验证是否正确
func Getflag(c *gin.Context) {
	sessiona := Getsessiona(c, "username")
	if sessiona == nil {
		c.Redirect(http.StatusFound, "/")
	}
	flags := c.PostForm("flags")
	data := ""
	fmt.Println(sessiona.(string))
	fmt.Println(flags)
	var flag []model.Flags
	time := time.Now()
	db := model.LinkDb()
	db.Where("username = ?", sessiona.(string)).First(&flag)
	if flag[0].Flag == flags {
		data = "Flag正确"
		solve := model.Solved{Username: sessiona.(string), Solve_time: &time, Topic_id: flag[0].Topic_id}
		db.Create(&solve)
		sqlDb, _ := db.DB()
		defer sqlDb.Close()
	} else {
		data = "Flag错误"
	}
	c.JSON(200, gin.H{
		data: data,
	})
}
