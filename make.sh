go build -ldflags '-s -w -L /usr/lib -linkmode "external" -extldflags "-static"'
