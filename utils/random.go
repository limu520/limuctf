package utils

import (
	"crypto/rand"
)

//随机字符串生成
func RandLow(n int) []byte {
	var letters = []byte("abcdefghjkmnpqrstuvwxyz123456789")
	if n <= 0 {
		return []byte{}
	}
	b := make([]byte, n)
	arc := uint8(0)
	if _, err := rand.Read(b[:]); err != nil {
		return []byte{}
	}
	for i, x := range b {
		arc = x & 31
		b[i] = letters[arc]
	}
	return b
}
