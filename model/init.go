package model

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func init() {

	db := LinkDb()

	if db.Migrator().HasTable(&User{}) == false {
		db.AutoMigrate(&User{})
	}
	if db.Migrator().HasTable(&Sign{}) == false {
		db.AutoMigrate(&Sign{})
	}
	if db.Migrator().HasTable(&Topics{}) == false {
		db.AutoMigrate(&Topics{})
	}
	if db.Migrator().HasTable(&Flags{}) == false {
		db.AutoMigrate(&Flags{})
	}
	if db.Migrator().HasTable(&Announcement{}) == false {
		db.AutoMigrate(&Announcement{})
	}
	if db.Migrator().HasTable(&Solved{}) == false {
		db.AutoMigrate(&Solved{})
	}
	if db.Migrator().HasTable(&Mechine{}) == false {
		db.AutoMigrate(&Mechine{})
	}
	//初始化管理用户(可以没有管理用户)
	var sign []Sign
	username := ""
	password := ""
	result := db.Where("ID = 1").Find(&sign)
	if result.RowsAffected == 0 {
		fmt.Print("未发现管理员用户，请创建管理员用户\n请输入管理员用户名：")
		fmt.Scanln("%s", username)
		fmt.Print("请输入管理员密码：")
		fmt.Scanln("%s", password)
		signs := Sign{Username: username, Password: password}
		users := User{Username: username, Stores: 0}
		db.Create(&signs)
		db.Create(&users)
	}

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
}
