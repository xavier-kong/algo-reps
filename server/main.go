package main

import (
	"fmt"
	"os/exec"
)

func main() {
	cmd := exec.Command("./test.py")
	out, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println(string(out))
}
