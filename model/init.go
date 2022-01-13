package model

import (
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

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
}
