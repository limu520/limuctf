package utils

import (
	"fmt"
	"io/ioutil"
	"os"
)

//读文件
func Readfile(file_url string) string {
	f, err := os.Open(file_url)
	if err != nil {
		fmt.Println("read file fail", err)
		return ""
	}
	defer f.Close()

	fd, err := ioutil.ReadAll(f)
	if err != nil {
		fmt.Println("read to fd fail", err)
		return ""
	}

	return string(fd)
}

//覆写文件
func Coverfile(file_url string, file_msg string) {
	var d = []byte(file_msg)
	err := ioutil.WriteFile(file_url, d, 0666)
	if err != nil {
		fmt.Println("write fail")
	}
	fmt.Println("write success")
}
