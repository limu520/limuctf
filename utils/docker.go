package utils

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

// func D_init() {
// 	d_url := "tcp://192.168.1.106:2333"
// }

//启动容器
func D_run(d_url string, c_name string, i_name string, i_port string, c_port string, flag string) string {
	ctx := context.Background()
	dclient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation(), client.WithHost(d_url))
	if err != nil {
		panic(err)
	}
	res, _ := dclient.ContainerCreate(ctx, &container.Config{
		Image:        i_name,
		Env:          []string{"ctf_flag=" + flag},
		ExposedPorts: nat.PortSet{nat.Port(i_port): struct{}{}},
	}, &container.HostConfig{
		AutoRemove: true,
		PortBindings: nat.PortMap{
			nat.Port(i_port): []nat.PortBinding{nat.PortBinding{
				HostIP:   "0.0.0.0",
				HostPort: c_port,
			}},
		},
	}, nil, nil, c_name)
	if err := dclient.ContainerStart(ctx, res.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}
	return c_port
}

//获取镜像信息（镜像名称，ID，暴露端口）
func D_info(d_url string) string {
	ctx := context.Background()
	dclient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation(), client.WithHost(d_url))
	if err != nil {
		panic(err)
	}
	string_data := ""
	d_list, _ := dclient.ImageList(ctx, types.ImageListOptions{})
	for _, value := range d_list {
		string_data = string_data + fmt.Sprintf(`<option value="%s">%s</option>`, value.RepoTags[0], value.RepoTags[0])
	}
	return string_data
}

//删除镜像(可以使用自定义的容器id)
func D_del(d_url string, con_id string) {
	ctx := context.Background()
	dclient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation(), client.WithHost(d_url))
	if err != nil {
		panic(err)
	}
	del_err := dclient.ContainerRemove(ctx, con_id, types.ContainerRemoveOptions{Force: true})
	if del_err != nil {
		panic(err)
	}
}
