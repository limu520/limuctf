package model

import (
	"time"
)

//用户登陆
type Sign struct {
	ID       int `gorm:"primary_key"`
	Username string
	Password string
}

//用户信息
type User struct {
	ID        int `gorm:"primary_key"`
	Username  string
	QQ        string
	Sign_time *time.Time
	Email     string
	Stores    int
}

//题目
type Topics struct {
	ID           int `gorm:"primary_key"`
	Name         string
	Image_name   string
	Mechine_id   string
	Private_port string
	Type         string
	Content      string
	Attachment   string
	Flag         string
	Score        int
	Dynamic      string
}

//flag储存
type Flags struct {
	ID           int `gorm:"primary_key"`
	Username     string
	Topic_id     int
	Container_id string
	Mechine_id   int
	Port         int
	Flag         string
	Create_time  *time.Time
}

//公告
type Announcement struct {
	ID          int `gorm:"primary_key"`
	Title       string
	Content     string
	Update_time *time.Time
}

//解题日志
type Solved struct {
	ID         int `gorm:"primary_key"`
	Username   string
	Solve_time *time.Time
	Topic_id   int
}

//主机管理
type Mechine struct {
	ID       int `gorm:"primary_key"`
	Username string
	Url      string
	Max_port int
	Min_port int
}
