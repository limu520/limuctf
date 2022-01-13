package utils

func Uncode(s string) string {
	c := string(rune(int(s[0]) - len(s)))
	for i := 1; i < len(s); i++ {
		c += string(rune(int(s[i]) - int(c[i-1])))
	}
	return c
}
