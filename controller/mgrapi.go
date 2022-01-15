package controller

import (
	"fmt"
	"limuctf/model"
	"limuctf/utils"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

//删除用户
func Deluser(c *gin.Context) {
	username := c.PostForm("username")
	var user []model.User
	var sign []model.Sign
	db := model.LinkDb()
	err1 := db.Where("username = ?", username).Delete(&user).Error
	err2 := db.Where("username = ?", username).Delete(&sign).Error
	fmt.Println(err1)
	fmt.Println(err2)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if username == "" || (err1 != nil || err2 != nil) {
		c.String(http.StatusOK, "无此用户")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//修改密码
func Chpasswd(c *gin.Context) {
	username := c.PostForm("username")
	passwd := c.PostForm("password")
	fmt.Println(username)
	fmt.Println(passwd)
	var user []model.Sign
	db := model.LinkDb()
	err := db.Model(&user).Where("username = ? ", username).Update("password", passwd).Error
	fmt.Println(err)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if (username == "" || passwd == "") || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//新增公告
func Newann(c *gin.Context) {
	title := c.PostForm("title")
	content := c.PostForm("context")
	update_time := time.Now()
	ann := model.Announcement{Title: title, Content: content, Update_time: &update_time}
	db := model.LinkDb()
	err := db.Create(&ann)
	fmt.Println(err)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if (title == "" || content == "") || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//删除公告
func Delann(c *gin.Context) {
	ann_id := c.PostForm("ann_id")
	var ann []model.Announcement
	db := model.LinkDb()
	err := db.Where("ID = ?", ann_id).Delete(&ann).Error
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if ann_id == "" || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//删除容器   docker容器操作未完善
func Delcon(c *gin.Context) {
	con_id := c.PostForm("con_id")
	var con []model.Flags
	var mechine []model.Mechine
	db := model.LinkDb()
	db.Where("ID = ?", con_id).First(&con)
	db.Where("ID =  ?", con[0].Mechine_id).First(&mechine)
	utils.D_del("tcp://"+mechine[0].Url, con[0].Container_id)
	err := db.Where("ID = ?", con_id).Delete(&con).Error
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if con_id == "" || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//新增主机
func Newmechine(c *gin.Context) {
	username := c.PostForm("mechine_name")
	urls := c.PostForm("mechine_url")
	min_port := c.PostForm("mechine_minport")
	max_port := c.PostForm("mechine_maxport")
	remin_port, _ := strconv.Atoi(min_port)
	remax_port, _ := strconv.Atoi(max_port)
	mechine := model.Mechine{Username: username, Url: urls, Min_port: remin_port, Max_port: remax_port}
	db := model.LinkDb()
	err := db.Create(&mechine)
	fmt.Println(err)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if (username == "" || urls == "") || (min_port == "" || max_port == "") || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//删除主机
func Delmechine(c *gin.Context) {
	mechine_id := c.PostForm("mechine_id")
	var mechine []model.Mechine
	db := model.LinkDb()
	err := db.Where("ID = ?", mechine_id).Delete(&mechine).Error
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if mechine_id == "" || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}

//获取主机列表
func Getmechine(c *gin.Context) {
	db := model.LinkDb()
	var mechine []model.Mechine
	db.Find(&mechine)
	data := ""
	for _, value := range mechine {
		data = data + fmt.Sprintf(`<option value="%d">%s</option>`, value.ID, value.Username)
	}
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.JSON(200, gin.H{
		"data": data,
	})
}

//获取题目列表
func Gettopic(c *gin.Context) {
	mechine_id := c.PostForm("mechine_id")
	db := model.LinkDb()
	var mechine []model.Mechine
	db.Where("id = ?", mechine_id).First(&mechine)
	data := utils.D_info("tcp://" + mechine[0].Url)
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.JSON(200, gin.H{
		"data": data,
	})
}

//新增题目
func Newtopic(c *gin.Context) {
	ctype := c.PostForm("ctype")
	name := c.PostForm("name")
	topictype := c.PostForm("type")
	topictext := c.PostForm("text")
	score := c.PostForm("score")
	mechine := ""
	container := ""
	port := ""
	flag := ""
	file, err := c.FormFile("uploadfile")
	topicurl := ""
	if err == nil {
		c.SaveUploadedFile(file, "./upload/"+file.Filename)
		topicurl = "/upload/" + file.Filename
	}
	if ctype == "1" {
		mechine = c.PostForm("mechine")
		container = c.PostForm("container")
		port = c.PostForm("port")

	} else if ctype == "0" {
		flag = c.PostForm("flag")
	} else {
		fmt.Printf("error")
	}
	rescore, _ := strconv.Atoi(score)
	fmt.Printf(name, topictype, topictext, score, mechine, container, port, flag)
	db := model.LinkDb()
	topic := model.Topics{Name: name, Image_name: container, Mechine_id: mechine, Private_port: port, Type: topictype, Content: topictext, Flag: flag, Score: rescore, Dynamic: ctype, Attachment: topicurl}
	db.Create(&topic)

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.JSON(200, gin.H{
		"status": "success",
	})
}

//删除题目
func Deltopic(c *gin.Context) {
	topic_id := c.PostForm("topic_id")
	var topic []model.Topics
	db := model.LinkDb()
	err := db.Where("ID = ?", topic_id).Delete(&topic).Error
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	if topic_id == "" || err != nil {
		c.String(http.StatusOK, "输入错误")
	} else {
		c.String(http.StatusOK, "success")
	}
}
