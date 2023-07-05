package hooks

import (
	"context"
	"fmt"
	typesDocker "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/gorchitech/types"
	Gtype "github.com/pocketbase/pocketbase/gorchitech/types"
	"github.com/pocketbase/pocketbase/models"
	"log"
	"strings"
)

func SetupOnBeforeContainerHooks(app *pocketbase.PocketBase) {
	onBeforeCreateContainer(app)
	onBeforeDeleteContainer(app)
	onBeforeUpdateContainer(app)
}

func onBeforeCreateContainer(app *pocketbase.PocketBase) {
	app.OnModelBeforeCreate("container").Add(func(e *core.ModelEvent) error {
		//Create the docker containers for the service function
		gcontainer := types.GContainerRecord{}
		err := gcontainer.FromRecordToContainer(e.Model.(*models.Record), app)
		log.Println("on  SetupOnBeforeImagesHooks", gcontainer)

		ctx := context.Background()
		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		LabelsString := strings.Split(gcontainer.Label, ",")
		log.Println("on  Create Container Labels", LabelsString)
		Labels := make(map[string]string)

		for i, label := range LabelsString {
			log.Println("on  label", label, i)
			Labels["key"+fmt.Sprintf("%d", i)] = label
		}

		EnvironmentString := strings.Split(gcontainer.Environment, ",")
		log.Println("on  Create Container Environment", EnvironmentString)

		CommandStrings := strings.Split(gcontainer.Command, ",")

		log.Println("on  Create Container CommandStrings", CommandStrings)
		bindings := nat.PortMap{}

		if gcontainer.Port != "" {
			PortsStrings := strings.Split(gcontainer.Port, ":")

			log.Println("on  Create Container PortsStrings", PortsStrings)

			PortsProtocolStrings := strings.Split(PortsStrings[1], "/")

			log.Println("on  Create Container PortsStrings", PortsStrings)

			port, err := nat.NewPort(PortsProtocolStrings[1], PortsProtocolStrings[0])
			if err != nil {
				panic(err)
			}

			bindings = nat.PortMap{
				port: []nat.PortBinding{{HostPort: PortsStrings[0]}},
			}
			log.Println("on  Create Container bindings", bindings)
		}

		configContainer := &container.Config{
			Labels:  Labels,
			Image:   gcontainer.Image.GetString("name"),
			Cmd:     CommandStrings,
			Volumes: map[string]struct{}{},
		}

		if gcontainer.Environment != "" {
			configContainer.Env = EnvironmentString
		}

		if gcontainer.Volumen != nil {
			log.Println("on  Create Container Volumen", gcontainer.Volumen)
			volumes := make(map[string]struct{})
			volumePaths := strings.Split(gcontainer.Volumen.GetString("mount"), ",")
			for _, path := range volumePaths {
				volumes[path] = struct{}{}
			}
			configContainer.Volumes = volumes
		}

		hostConfig := &container.HostConfig{
			Resources: container.Resources{
				CPUShares: 512,
				Memory:    gcontainer.Memory * 1024 * 1024, // 512 MB
				NanoCPUs:  gcontainer.Cpu,
			},
			PortBindings: bindings,
		}

		log.Println("on  Create Container bindings", gcontainer.Network)

		networkName := "bridge"

		networkConfig := &network.NetworkingConfig{
			EndpointsConfig: map[string]*network.EndpointSettings{
				networkName: {
					NetworkID: networkName,
				},
			},
		}

		if gcontainer.Network != nil {
			networkName := gcontainer.Network.GetString("name")
			networkConfig := &network.NetworkingConfig{
				EndpointsConfig: map[string]*network.EndpointSettings{
					networkName: {
						NetworkID: networkName,
					},
				},
			}
			log.Println("on  Create Container bindings", networkConfig)
		}

		resp, err := cli.ContainerCreate(ctx, configContainer, hostConfig, networkConfig, nil, gcontainer.Name)
		if err != nil {
			panic(err)
		}
		log.Println("on  Create container", resp.ID)
		gcontainer.ContainerId = resp.ID
		Gtype.FromContainerToRecord(e.Model.(*models.Record), &gcontainer)
		onStateContainer(cli, ctx, gcontainer.ContainerId, gcontainer.Status, false)
		ports, ip := onGetPortIpContainer(cli, ctx, gcontainer.ContainerId, networkName)
		log.Println("on  onGetPortIpContainer", ports, ip)
		gcontainer.Port = mapToString(ports)
		gcontainer.Ip = ip
		Gtype.FromContainerToRecord(e.Model.(*models.Record), &gcontainer)
		return nil
	})
}

func onBeforeDeleteContainer(app *pocketbase.PocketBase) {
	app.OnModelBeforeDelete("container").Add(func(e *core.ModelEvent) error {
		//Create the docker containers for the service function
		gcontainer := types.GContainerRecord{}
		err := gcontainer.FromRecordToContainer(e.Model.(*models.Record), app)
		log.Println("on  OnModelBeforeDelete", gcontainer)

		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		if err := cli.ContainerStop(context.Background(), gcontainer.ContainerId, container.StopOptions{}); err != nil {
			panic(err)
		}
		// Remove the container
		if err := cli.ContainerRemove(context.Background(), gcontainer.ContainerId, typesDocker.ContainerRemoveOptions{
			RemoveVolumes: true, // Set to true if you want to remove the associated volumes as well
			Force:         true, // Set to true if you want to force the removal of a running container
		}); err != nil {
			panic(err)
		}
		return nil
	})
}

func onBeforeUpdateContainer(app *pocketbase.PocketBase) {
	app.OnModelBeforeUpdate("container").Add(func(e *core.ModelEvent) error {
		//Create the docker containers for the service function
		gcontainer := types.GContainerRecord{}
		err := gcontainer.FromRecordToContainer(e.Model.(*models.Record), app)
		log.Println("on  onBeforeUpdateContainer", gcontainer)

		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		networkName := "bridge"
		if gcontainer.Network != nil {
			networkName = gcontainer.Network.GetString("name")
		}
		onStateContainer(cli, context.Background(), gcontainer.ContainerId, gcontainer.Status, true)
		if gcontainer.Status == "start" || gcontainer.Status == "restart" {
			ports, ip := onGetPortIpContainer(cli, context.Background(), gcontainer.ContainerId, networkName)
			log.Println("on  onGetPortIpContainer", ports, ip)
			gcontainer.Port = mapToString(ports)
			gcontainer.Ip = ip
			Gtype.FromContainerToRecord(e.Model.(*models.Record), &gcontainer)
		}
		return nil
	})
}

func onStateContainer(cli *client.Client, ctx context.Context, ContainerId string, State string, Trows bool) {
	log.Println("on  StateContainer", ContainerId, State)
	var err error
	if State == "start" {
		err = cli.ContainerStart(ctx, ContainerId, typesDocker.ContainerStartOptions{})
	} else if State == "stop" {
		err = cli.ContainerStop(ctx, ContainerId, container.StopOptions{})
	} else if State == "delete" {
		err = cli.ContainerRemove(ctx, ContainerId, typesDocker.ContainerRemoveOptions{
			Force: true,
		})
	} else if State == "restart" {
		err = cli.ContainerRestart(ctx, ContainerId, container.StopOptions{})
	}
	log.Println("on  onStateContainer", err)
	if Trows && err != nil {
		panic(err)
	}
}

func onGetPortIpContainer(cli *client.Client, ctx context.Context, ContainerId string, NetworkName string) (p nat.PortMap, ip string) {
	log.Println("on  onGetPortIpContainer", ContainerId)
	containerInfo, err := cli.ContainerInspect(ctx, ContainerId)
	if err != nil {
		fmt.Println("Failed to inspect container:", err)
		return
	}
	log.Println("on  onGetPortIpContainer", containerInfo.NetworkSettings)
	ipAddress := containerInfo.NetworkSettings.Networks[NetworkName].IPAddress
	ports := containerInfo.NetworkSettings.Ports
	return ports, ipAddress
}

func mapToString(m map[nat.Port][]nat.PortBinding) string {
	var sb strings.Builder

	for key, value := range m {
		sb.WriteString(fmt.Sprintf("%s:%v\n", key, value))
	}

	return sb.String()
}
