package model

import (
	"limuctf/utils"
	"time"
)

//定时清理
func Dockerclean() {
	for {
		db := LinkDb()
		var flag []Flags
		var mechine []Mechine
		result2 := db.Find(&mechine)
		if result2.RowsAffected != 0 {
			for _, value := range mechine {
				result1 := db.Where("mechine_id = ?", value.ID).Find(&flag)
				if result1.RowsAffected != 0 {
					for _, flags := range flag {
						if time.Until(*flags.Create_time).Minutes() < -30 {
							utils.D_del("tcp://"+value.Url, flags.Container_id)
							db.Delete(&flags)
						}
					}
				}
			}
		}
		time.Sleep(60 * time.Second)

		sqlDb, _ := db.DB()
		defer sqlDb.Close()
	}
}
