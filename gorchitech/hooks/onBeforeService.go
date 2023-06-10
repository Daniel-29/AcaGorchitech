package hooks

import (
	"context"
	typesDocker "github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/gorchitech/types"
	"github.com/pocketbase/pocketbase/models"
	"io"
	"os"
)

func SetupOnBeforeServiceHooks(app *pocketbase.PocketBase) {
	onBeforeCreate(app)
}

func onBeforeCreate(app *pocketbase.PocketBase) {
	app.OnModelBeforeCreate("services").Add(func(e *core.ModelEvent) error {
		//Create the docker containers for the service function
		service := types.ServiceRecord{}
		err := service.FromRecord(e.Model.(*models.Record), app)
		if err != nil {
			return err
		}
		err = service.InferInfo()
		if err != nil {
			return err
		}
		//Create the docker containers for the service function
		ctx := context.Background()
		cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
		if err != nil {
			panic(err)
		}
		defer cli.Close()

		reader, err := cli.ImagePull(ctx, service.Image, typesDocker.ImagePullOptions{})
		if err != nil {
			panic(err)
		}
		io.Copy(os.Stdout, reader)
		networkName := "gorchitech-network"
		networkConfig := &network.NetworkingConfig{
			EndpointsConfig: map[string]*network.EndpointSettings{
				networkName: {
					NetworkID: networkName,
				},
			},
		}
		resp, err := cli.ContainerCreate(ctx, &container.Config{
			Image: service.Image,
			Cmd:   service.Command,
		}, nil, networkConfig, nil, service.Name)
		if err != nil {
			panic(err)
		}

		if err := cli.ContainerStart(ctx, resp.ID, typesDocker.ContainerStartOptions{}); err != nil {
			panic(err)
		}

		/*statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNextExit)
		select {
		case err := <-errCh:
			if err != nil {
				panic(err)
			}
		case <-statusCh:
		}

		out, err := cli.ContainerLogs(ctx, resp.ID, typesDocker.ContainerLogsOptions{ShowStdout: true})
		if err != nil {
			panic(err)
		}

		stdcopy.StdCopy(os.Stdout, os.Stderr, out)*/
		return nil
	})
}
