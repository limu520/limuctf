package model

import (
	"fmt"
	"limuctf/utils"

	jsoniter "github.com/json-iterator/go"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func LinkDb() *gorm.DB {
	menu_file := utils.Readfile("config/db.json")
	menu_json := []byte(menu_file)
	db_name := jsoniter.Get(menu_json, "db_name").ToString()
	db_address := jsoniter.Get(menu_json, "db_address").ToString()
	db_port := jsoniter.Get(menu_json, "db_port").ToString()
	db_user := jsoniter.Get(menu_json, "db_user").ToString()
	db_password := jsoniter.Get(menu_json, "db_password").ToString()
	// db, err := gorm.Open("mysql", "root:123456789@tcp(127.0.0.1:3307)/wiki?charset=utf8&parseTime=True")
	//server.GetDbConfig() //服务获取config里面的数据库信息
	dsn := fmt.Sprintf("%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_password, db_address, db_port, db_name)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// sqlDb,_ := db.DB()
	// defer sqlDb.Close()
	// sqlDb.SetMaxIdleConns(100) //设置最大连接数
	// sqlDb.SetMaxOpenConns(100) //设置最大的空闲连接数
	if err != nil {
		panic(err)
	}
	return db
}
