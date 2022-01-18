package model

import (
	"fmt"
	"limuctf/utils"
	"time"
)

//定时清理
func Dockerclean() {
	for {
		db := LinkDb()
		var flag []Flags
		var mechine []Mechine
		db.Find(&mechine)
		for _, value := range mechine {
			result1 := db.Where("mechine_id = ?", value.ID).Find(&flag)
			if result1.RowsAffected != 0 {
				for _, flags := range flag {
					fmt.Println(time.Until(*flags.Create_time).Minutes())
					if time.Until(*flags.Create_time).Minutes() < -30 {
						utils.D_del("tcp://"+value.Url, flags.Container_id)
						db.Delete(&flags)
					}
				}
			}
			time.Sleep(60 * time.Second)
		}

		sqlDb, _ := db.DB()
		defer sqlDb.Close()
	}
}
